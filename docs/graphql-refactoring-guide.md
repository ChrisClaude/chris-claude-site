# GraphQL Refactoring Guide: Taking Full Advantage of HotChocolate

## Overview

The API was recently migrated from REST to GraphQL, but much of the implementation still follows REST patterns — manually paginated queries, no client-driven filtering or sorting, and full entity hydration regardless of what the client actually requests. This guide describes how to refactor each layer to use HotChocolate's built-in data-fetching primitives: **Projections**, **Filtering**, **Sorting**, **Pagination**, and **DataLoader**.

---

## The Core Architectural Shift

The most significant change is how data flows from the database to the resolver.

**Current flow (REST-style):**
```
Resolver → IPostQueries.GetPostsAsync(page, pageSize)
         → Repository.GetAllPagedAsync(...)  ← materializes everything
         → PostMapper.MapToDto(...)           ← maps all fields
         → Result<PagedListDto<PostDto>>      ← returns fully-loaded DTO
```

**Target flow (GraphQL-native):**
```
Resolver → returns IQueryable<Post>          ← deferred, no DB hit yet
         → [UsePaging]    applies OFFSET/LIMIT or cursor
         → [UseProjection] applies SELECT only requested columns
         → [UseFiltering]  applies WHERE from client filter arg
         → [UseSorting]    applies ORDER BY from client sort arg
                                              ← single optimised SQL query
```

The key enabler is returning `IQueryable<T>` from resolvers so HotChocolate middleware can compose the final SQL before it executes.

---

## 1. Service Registration

### `WebApplicationConfiguration.cs`

Add the four middleware registrations to the GraphQL server builder:

```csharp
services
    .AddGraphQLServer()
    .RegisterDbContextFactory<ApplicationDbContext>()
    .AddQueryType()
    .AddTypeExtension(typeof(UserQuery))
    .AddTypeExtension(typeof(PostQuery))
    .AddMutationType()
    .AddTypeExtension(typeof(UserMutation))
    .AddMutationConventions()
    .AddAuthorization()
    .AddProjections()    // ← new
    .AddFiltering()      // ← new
    .AddSorting()        // ← new
    .AddPaging();        // ← new
```

**NuGet:** All four features ship in `HotChocolate.Data`. No additional packages are required.

---

## 2. Expose `IQueryable<T>` from the Data Layer

HotChocolate's middleware stack operates on `IQueryable<T>`. It cannot compose on top of a materialized `List<T>` or `Task<Result<PagedListDto<T>>>`. The existing `IRepository<T>` interface returns materialised results, so we need a thin read-side that exposes the raw queryable.

### New interface: `IQueryableSource<T>`

```csharp
// Application/Interfaces/IQueryableSource.cs
public interface IQueryableSource<TEntity> where TEntity : BaseEntity
{
    IQueryable<TEntity> Query(bool includeDeleted = false);
}
```

### Implementation

```csharp
// Infrastructure/QueryableSource.cs
public class QueryableSource<TEntity> : IQueryableSource<TEntity>
    where TEntity : BaseEntity
{
    private readonly ApplicationDbContext _context;

    public QueryableSource(ApplicationDbContext context)
        => _context = context;

    public IQueryable<TEntity> Query(bool includeDeleted = false)
    {
        var query = _context.Set<TEntity>().AsQueryable();

        if (!includeDeleted && typeof(ISoftDeletedEntity).IsAssignableFrom(typeof(TEntity)))
            query = query.Where(e => !((ISoftDeletedEntity)e).IsDeleted);  // cast hint for EF

        return query;
    }
}
```

> **Note on soft deletes:** Because EF Core cannot use interface members directly in LINQ expressions, apply the soft-delete filter per entity type in each resolver (or use a global query filter in `ApplicationDbContext.OnModelCreating`, which is the cleanest long-term approach). See [EF Core global query filters](https://learn.microsoft.com/en-us/ef/core/querying/filters).

Register in `Infrastructure/DependencyRegistrar.cs`:
```csharp
services.AddScoped(typeof(IQueryableSource<>), typeof(QueryableSource<>));
```

---

## 3. Projections

### What it does
`[UseProjection]` intercepts the incoming GraphQL selection set and translates it into a SQL `SELECT` for only the requested columns. If the client asks for `{ posts { title slug } }`, EF Core generates `SELECT title, slug FROM Posts` — not `SELECT *`.

### Requirement: public setters on entities
HotChocolate's projection middleware uses object initialisation and **requires public setters**. Review all entity classes and ensure all mapped properties have `{ get; set; }` (not `{ get; init; }`).

### Resolver pattern

```csharp
[QueryType]
internal static class PostQuery
{
    [Authorize]
    [UsePaging]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public static IQueryable<Post> GetPosts(
        [Service] IQueryableSource<Post> source
    )
        => source.Query().Where(p => p.Status == PostStatus.Published);
}
```

> **Middleware order is mandatory:** `[UsePaging]` → `[UseProjection]` → `[UseFiltering]` → `[UseSorting]`. Attributes stack bottom-up in C#, so write them top-to-bottom in this order on the method.

### Remove manual DTO mapping
`PostMapper` and `UserMapper` become unnecessary for query resolvers. HotChocolate projects directly from the entity to the GraphQL response shape the client requested. Keep mappers only where they serve commands/mutations that still use the Result pattern.

---

## 4. Filtering

### What it does
`[UseFiltering]` generates a `where` argument in the GraphQL schema. Clients can pass complex, nested filter expressions that are automatically translated to SQL `WHERE` clauses.

Example client query:
```graphql
query {
  posts(where: { title: { contains: "GraphQL" }, status: { eq: PUBLISHED } }) {
    nodes { id title slug }
  }
}
```

### Restricting exposed filter fields

By default HotChocolate exposes every field on the entity as filterable, including internal audit fields. Restrict this with a custom `FilterInputType`:

```csharp
// BlogAPI/GraphQL/Filters/PostFilterType.cs
public class PostFilterType : FilterInputType<Post>
{
    protected override void Configure(IFilterInputTypeDescriptor<Post> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(p => p.Title);
        descriptor.Field(p => p.Status);
        descriptor.Field(p => p.Slug);
        descriptor.Field(p => p.AuthorId);
        descriptor.Field(p => p.PublishedAt);
        descriptor.Field(p => p.CreatedAt);
    }
}
```

Apply to the resolver:
```csharp
[UseFiltering(typeof(PostFilterType))]
```

Do the same for `UserFilterType`, exposing only `Email`, `Name`, `Surname`.

---

## 5. Sorting

### What it does
`[UseSorting]` generates an `order` argument. Clients choose sort fields and direction:

```graphql
query {
  posts(order: [{ publishedAt: DESC }]) {
    nodes { title publishedAt }
  }
}
```

### Restricting exposed sort fields

```csharp
// BlogAPI/GraphQL/Sorting/PostSortType.cs
public class PostSortType : SortInputType<Post>
{
    protected override void Configure(ISortInputTypeDescriptor<Post> descriptor)
    {
        descriptor.BindFieldsExplicitly();
        descriptor.Field(p => p.PublishedAt);
        descriptor.Field(p => p.CreatedAt);
        descriptor.Field(p => p.Title);
    }
}
```

Apply:
```csharp
[UseSorting(typeof(PostSortType))]
```

Remove hardcoded `OrderBy` calls from `PostQueries.cs` and `UserQueries.cs` — the client now drives ordering.

---

## 6. Pagination

### Replace custom `PagedListDto<T>` with HotChocolate pagination

The current `page` / `pageSize` integer parameters and the hand-rolled `PagedListDto<T>` should be replaced with HotChocolate's built-in pagination types.

#### Option A — Cursor-based (recommended for feeds/infinite scroll)

```csharp
[UsePaging(IncludeTotalCount = true)]
public static IQueryable<Post> GetPosts(...) => ...
```

Generated schema:
```graphql
type PostsConnection {
  pageInfo: PageInfo!
  edges: [PostsEdge!]
  nodes: [Post!]
  totalCount: Int!
}
type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

Client query:
```graphql
query {
  posts(first: 10, after: "cursor==") {
    pageInfo { hasNextPage endCursor }
    nodes { title slug }
    totalCount
  }
}
```

#### Option B — Offset-based (closer to current behaviour, easier migration)

```csharp
[UseOffsetPaging(IncludeTotalCount = true)]
public static IQueryable<Post> GetPosts(...) => ...
```

Generated schema:
```graphql
type PostsCollectionSegment {
  items: [Post]
  pageInfo: CollectionSegmentInfo!
  totalCount: Int!
}
```

Client query:
```graphql
query {
  posts(skip: 0, take: 10) {
    items { title slug }
    pageInfo { hasNextPage }
    totalCount
  }
}
```

> **Recommendation:** Use cursor-based (`[UsePaging]`) for public post feeds and `[UseOffsetPaging]` for the admin user list, where admins typically navigate to page N directly.

#### Migration note
`PagedListDto<T>` and `IPagedList<T>` remain used by commands and any internal services — do not delete them. They become unused only in the GraphQL resolver layer.

---

## 7. DataLoader

### The N+1 problem in the current code

Every `PostDto` includes an `Author` (a `UserDto`). With the current approach, every post independently triggers a query to load its author. If a page returns 20 posts, that's 20 separate `SELECT * FROM Users WHERE Id = @id` queries.

The current code avoids this with `.Include()` (eager loading everything), which is the opposite problem — it over-fetches all user data even when the client only asked for the post title.

### DataLoader solution

A DataLoader batches all the individual ID lookups made during one GraphQL request into a single `WHERE Id IN (...)` query.

```csharp
// BlogAPI/GraphQL/DataLoaders/UserByIdDataLoader.cs
internal static class UserDataLoaders
{
    [DataLoader]
    public static async Task<IReadOnlyDictionary<Guid, User>> GetUserByIdAsync(
        IReadOnlyList<Guid> userIds,
        ApplicationDbContext context,
        CancellationToken cancellationToken)
        => await context.Users
            .Where(u => userIds.Contains(u.Id))
            .ToDictionaryAsync(u => u.Id, cancellationToken);
}
```

The source generator creates `IUserByIdDataLoader` automatically.

### Wire it into a type extension

Rather than resolving the author inside the post entity, define it as a resolver on the Post GraphQL type:

```csharp
// BlogAPI/GraphQL/Types/PostType.cs
[ExtendObjectType(typeof(Post))]
internal static class PostType
{
    public static async Task<User?> GetAuthorAsync(
        [Parent] Post post,
        IUserByIdDataLoader dataLoader,
        CancellationToken cancellationToken)
        => await dataLoader.LoadAsync(post.AuthorId, cancellationToken);
}
```

Register the type extension:
```csharp
.AddTypeExtension(typeof(PostType))
```

Now when a client requests `{ posts { title author { name } } }`:
- HotChocolate resolves all 20 posts first
- Then the DataLoader receives all 20 `AuthorId` values and fires a single `SELECT ... WHERE Id IN (...)` query

The same pattern applies to:
- `Comment.Author` → `UserByIdDataLoader`
- `Post.Tags` → group DataLoader keyed by `PostId` → `TagsByPostIdDataLoader`
- `Post.Reactions` → group DataLoader keyed by `PostId`

---

## 8. Refactored Resolver Summary

### `PostQuery.cs` (after refactoring)

```csharp
[QueryType]
internal static class PostQuery
{
    [Authorize]
    [UsePaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering(typeof(PostFilterType))]
    [UseSorting(typeof(PostSortType))]
    public static IQueryable<Post> GetPosts(
        [Service] IQueryableSource<Post> source
    )
        => source.Query().Where(p => p.Status == PostStatus.Published);
}
```

### `UserQuery.cs` (after refactoring)

```csharp
[QueryType]
internal static class UserQuery
{
    [Authorize]
    [UseProjection]
    public static IQueryable<User> MeAsync(
        [Service] IQueryableSource<User> source,
        IHttpContextAccessor httpContextAccessor
    )
    {
        ArgumentNullException.ThrowIfNull(httpContextAccessor);
        var contextUser = httpContextAccessor.GetRequiredUser();
        return source.Query().Where(u => u.Id == contextUser.Id);
    }

    [Authorize(Policy = AuthPolicy.ADMIN)]
    [UseOffsetPaging(IncludeTotalCount = true)]
    [UseProjection]
    [UseFiltering(typeof(UserFilterType))]
    [UseSorting(typeof(UserSortType))]
    public static IQueryable<User> GetUsers(
        [Service] IQueryableSource<User> source
    )
        => source.Query();
}
```

---

## 9. What Happens to the Existing Query Classes

| Class | Action |
|---|---|
| `IPostQueries` / `PostQueries` | Remove — replaced by `IQueryableSource<Post>` in resolver |
| `IUserQueries` / `UserQueries` | Remove `GetPostsAsync`/`GetUsersAsync`; keep `GetUserAsync` only if used by commands |
| `PostMapper` / `UserMapper` | Keep only for command/mutation use cases; remove query-side usage |
| `PagedListDto<T>` / `IPagedList<T>` | Keep for internal use; no longer part of GraphQL response types |
| `IRepository<T>.GetAllPagedAsync` | Keep for any non-GraphQL use; no longer called from resolvers |

---

## 10. Recommended Migration Order

1. **Register** `.AddProjections()`, `.AddFiltering()`, `.AddSorting()`, `.AddPaging()` in `WebApplicationConfiguration.cs`
2. **Add global query filters** in `ApplicationDbContext.OnModelCreating` for soft-delete (removes the need to handle `ISoftDeletedEntity` in `QueryableSource`)
3. **Create** `IQueryableSource<T>` and `QueryableSource<T>`
4. **Refactor `PostQuery`** — start here as it has the most value (public, high traffic)
5. **Refactor `UserQuery`**
6. **Add DataLoaders** for `Post.Author`, `Post.Tags`, `Comment.Author`
7. **Add filter/sort type restrictions** to avoid exposing internal fields
8. **Update frontend** queries to use the new Connection/CollectionSegment response shapes and the new filter/sort arguments
9. **Delete** now-unused query classes and mapper call sites

---

## 11. Things to Watch Out For

| Concern | Detail |
|---|---|
| **Public setters** | Projections require `{ get; set; }` on entity properties. `init`-only setters will silently return default values. |
| **Middleware order** | Always: `[UsePaging]` → `[UseProjection]` → `[UseFiltering]` → `[UseSorting]`. Wrong order causes runtime errors or incorrect behaviour. |
| **Split queries** | HotChocolate projections generate single queries. Remove `.AsSplitQuery()` from `IQueryableSource` — it conflicts with projection-generated queries that do not use multiple result sets. |
| **N+1 via projections** | Projections handle scalar column selection but not navigation property batching. DataLoaders are still required for related entities (`Author`, `Tags`, etc.). |
| **Authorization on filtered fields** | `[UseFiltering]` exposes fields to clients. Ensure `PostFilterType` and `UserFilterType` do not expose fields that should be role-gated (e.g., `IsDeleted`, audit fields). |
| **Frontend breaking change** | Switching from `PagedListDto` (with `items`, `totalCount`, `pageIndex`) to Connection types (with `nodes`, `edges`, `pageInfo`) is a **breaking change** for existing frontend queries. Coordinate the migration. |
| **`Me` query** | `MeAsync` returns a single user. Use `[UseFirstOrDefault]` with `[UseProjection]` instead of `[UsePaging]`, since it resolves exactly one record. |
