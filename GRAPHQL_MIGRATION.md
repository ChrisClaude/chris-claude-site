# GraphQL Migration Plan: REST → GraphQL

## Current State

### Backend
- ASP.NET Core (.NET 10) with Clean Architecture / CQRS (MediatR)
- **One REST endpoint:** `GET /api/User/me` via `UserController`
- HotChocolate (`HotChocolate.AspNetCore` v15.1.12) is already installed but not wired up
- JWT auth via Azure AD B2C (`Microsoft.Identity.Web`)
- FluentValidation + MediatR pipeline behaviors (logging, validation, transactions, auth)

### Frontend
- Next.js 16 (App Router) + TypeScript
- RTK Query (`@reduxjs/toolkit`) with a custom base query that routes to codegen'd REST clients
- Redux store holds `userProfile: UserDto | null` in `authReducer`
- `useAuth.ts` wraps `useSession` + `useGetUserProfileQuery` for role checks
- Auto-generated API client in `src/app/_lib/codegen/` from OpenAPI spec
- Call chain: `RTK slice → customBaseQuery → UserService → codegen UserApi → GET /api/User/me`

---

## Target State

### Backend
- HotChocolate GraphQL server at `/graphql`
- GraphQL resolvers dispatch to existing MediatR handlers (CQRS pipeline unchanged)
- REST layer removed (no controllers, no OpenAPI/Scalar)

### Frontend
- Apollo Client replaces RTK Query + Redux entirely
- Apollo cache owns `userProfile` — role checks derived from cached user data
- No Redux, no codegen, no OpenAPI generator

---

## Backend Migration

### 1. Wire up HotChocolate

In `WebApplicationConfiguration.cs`, register the GraphQL server in services and map the endpoint in middleware:

```csharp
// In AddApplicationServices:
services
    .AddGraphQLServer()
    .AddQueryType<UserQuery>()
    .AddAuthorization();

// In UseApplicationMiddleware:
app.MapGraphQL(); // serves at /graphql by default
```

### 2. GraphQL type structure

Create a new folder in the `BlogAPI` project:

```
BlogAPI/
  GraphQL/
    Queries/
      UserQuery.cs
    Types/
      UserType.cs
      PostType.cs
      (add more as domain grows)
```

### 3. Resolver pattern

Resolvers inject `IMediator` and dispatch — same as controllers today. Authentication context flows via `IHttpContextAccessor`, preserving the existing `GetContextUser()` pattern:

```csharp
[QueryType]
public class UserQuery
{
    [Authorize]
    public async Task<UserDto> GetMe(
        [Service] IMediator mediator,
        [Service] IHttpContextAccessor httpContextAccessor)
    {
        var user = httpContextAccessor.HttpContext?.Items["ContextUser"] as UserDto
            ?? throw new UnauthorizedAccessException();
        return await mediator.Send(new GetUserQuery(user.Id));
    }
}
```

### 4. Authentication

The existing JWT middleware continues to run unchanged. HotChocolate's `[Authorize]` attribute integrates with ASP.NET Core's auth pipeline. No changes needed to `AuthenticationConfiguration.cs` or `AuthorizationConfiguration.cs`.

### 5. Remove the REST layer

Once GraphQL is verified end-to-end:

- Delete `BlogAPI/Controllers/UserController.cs`
- Delete `BlogAPI/Controllers/BaseController.cs`
- Remove Scalar/OpenAPI registration from `WebApplicationConfiguration.cs`
- Remove `Scalar.AspNetCore` from `BlogAPI.csproj`

---

## Frontend Migration

### 1. Package changes

**Remove:**
```
@reduxjs/toolkit
react-redux
openapi-generator-cli (devDependency)
```

**Add:**
```
@apollo/client
graphql
```

**Delete:**
- `src/app/_lib/store.ts`
- `src/app/_lib/queries/` (RTK Query slice)
- `src/app/_lib/services/` (UserService, api.service)
- `src/app/_lib/codegen/` (entire generated client)

### 2. Apollo Client setup

Create `src/app/_lib/apollo/client.ts`:

```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      authorization: session?.accessToken ? `Bearer ${session.accessToken}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

Wrap the app in `ApolloProvider` in the root layout.

### 3. GraphQL query definitions

Create `src/app/_lib/graphql/queries/user.ts`:

```typescript
import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      name
      surname
      image
      userRoles {
        role {
          name
        }
      }
    }
  }
`;
```

### 4. Update `useAuth.ts`

Replace `useGetUserProfileQuery` with Apollo's `useQuery`:

```typescript
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { GET_ME } from "../graphql/queries/user";

export function useAuth() {
  const { data: session, status } = useSession();
  const { data, loading } = useQuery(GET_ME, {
    skip: status !== "authenticated",
  });

  const userProfile = data?.me ?? null;
  const roles = userProfile?.userRoles?.map((ur) => ur.role.name) ?? [];

  return {
    session,
    userProfile,
    isAdmin: roles.includes("ADMIN"),
    isReader: roles.includes("READER"),
    containsRoles: (r: string[]) => r.every((role) => roles.includes(role)),
    isFetchingUserProfile: loading,
    login: () => signIn("azure-ad-b2c"),
    logout: () => signOut(),
  };
}
```

### 5. Remove Redux Provider

Remove `<Provider store={store}>` from the root layout. Apollo's cache fully owns server state.

---

## Implementation Order

1. **Wire up HotChocolate** on the backend — add `UserQuery.GetMe`, verify via `/graphql` playground
2. **Verify auth end-to-end** — confirm JWT flows through to the resolver
3. **Add Apollo Client** to the frontend — replace `useGetUserProfileQuery` with `useQuery(GET_ME)`
4. **Verify frontend auth flow** — `useAuth` works, role checks pass
5. **Delete REST layer** — controllers, OpenAPI, Scalar
6. **Delete RTK layer** — store, codegen, services, queries
7. **Add future queries/mutations in GraphQL** — posts, comments, etc. (no more REST controllers)

---

## Future Considerations

### N+1 protection (DataLoader)
As relational queries are added (e.g. posts with authors, comments with users), set up HotChocolate's built-in DataLoader support to batch database calls.

### Subscriptions
HotChocolate supports real-time subscriptions over WebSockets. Decide early whether features like live comment feeds or notifications warrant enabling WebSocket transport from the start.

### Pagination
HotChocolate has first-class cursor-based pagination support (`[UsePaging]`). The existing `PagedListDto<T>` can be replaced with the Relay connection pattern, which Apollo Client also understands natively.

### Code generation (optional)
Instead of OpenAPI codegen, consider `graphql-codegen` to generate TypeScript types from the GraphQL schema. This preserves end-to-end type safety without the manual overhead of the current approach.
