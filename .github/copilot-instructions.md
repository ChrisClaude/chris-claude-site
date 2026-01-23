# Chris Claude Site - AI Agent Instructions

## Project Overview

A full-stack personal website with technical blog, built as a portfolio showcase. Architecture:
- **Frontend**: Next.js 16 (TypeScript, TailwindCSS, React 18) serving markdown articles at `chrisclaude.com`
- **Backend**: .NET 10 Web API (BlogAPI) with clean architecture (Application/Infrastructure layers)
- **Cloud**: Terraform-managed Azure infrastructure (App Service, Entra External ID)
- **Migration Path**: .NET Aspire application in `AspireApp/` (planned migration from current stack)

## Architecture Patterns

### Backend (.NET) - Clean Architecture with Central Package Management

**Project Structure:**
- `BlogAPI/` - API layer (controllers, middleware, configurations)
- `Application/` - Domain logic (entities, interfaces, events, caching)
- `Infrastructure/` - Data access (EF Core with PostgreSQL, repositories)
- Tests: `Application.UnitTests/` and `Application.IntegrationTests/`

**Key Patterns:**
1. **DependencyRegistrar Pattern**: Each layer exposes `Add{Layer}()` extension methods
   - `Application.AddApplication()` - registers domain services
   - `Infrastructure.AddInfrastructure(appConfigurations)` - configures DbContext
   - Chain in [BlogAPI/WebApplicationConfiguration.cs](backend/BlogAPI/WebApplicationConfiguration.cs#L48-L50)

2. **Repository Pattern**: Generic `IRepository<TEntity>` with caching support
   - Implementation: [Infrastructure/EntityRepository.cs](backend/Infrastructure/EntityRepository.cs)
   - All entities inherit from `BaseEntity` (Application/Entities)
   - Supports soft deletes, EF includes, custom selectors, pagination

3. **Configuration Pattern**: Settings mapped to strongly-typed `AppConfigurations` class
   - Retrieved via `configuration.GetSection("AppConfigurations").Get<AppConfigurations>()`
   - Used for database, CORS, health checks

4. **Minimal Program.cs**: All setup delegated to `WebApplicationConfiguration`
   ```csharp
   builder.AddDevelopmentConfiguration();
   var app = builder.ConfigureServices();
   app.ConfigureRequestPipeline();
   ```

**NuGet Management:**
- Uses [Central Package Management](https://learn.microsoft.com/en-us/nuget/consume-packages/Central-Package-Management)
- Versions defined ONLY in [Directory.Packages.props](backend/Directory.Packages.props)
- Projects reference packages WITHOUT versions: `<PackageReference Include="Serilog" />`

**Code Quality:**
- [Directory.Build.props](backend/Directory.Build.props) enforces:
  - `TreatWarningsAsErrors`, `Nullable=enable`, `ImplicitUsings`
  - SonarAnalyzer with all analyzers enabled
  - Documentation file generation required

### Frontend (Next.js) - Server Components + API Routes

**Data Flow:**
- Articles stored as markdown in `frontend/articles/`
- Next.js API routes (`src/app/api/articles/`) serve paginated data
- Server-side library functions in `src/app/lib/articles.ts` parse markdown
- Example: [/api/articles route](frontend/src/app/api/articles/route.ts) calls `getPaginatedArticles()`

**State Management:**
- Context API via `UIContextProvider` in [src/app/hooks/UIContext.tsx](frontend/src/app/hooks/UIContext.tsx)
- Theme switching with `next-themes` in [components/ThemeProvider](frontend/src/app/components/ThemeProvider.tsx)

## Development Workflows

### Backend Commands (from `/backend`)
```bash
dotnet build ChrisClaude.sln           # Build entire solution
dotnet test                             # Run all tests (unit + integration)
dotnet run --project BlogAPI            # Start API (https://localhost:5001)
```

**Health Checks**: Custom JSON response at `/healthz` (configured in [HealthChecksConfiguration.cs](backend/BlogAPI/Configurations/HealthChecksConfiguration.cs))

### Frontend Commands (from `/frontend`)
```bash
pnpm install                            # Install dependencies (pnpm preferred)
pnpm dev                                # Dev server on :3000
pnpm build && pnpm start                # Production build
pnpm lint:fix                           # ESLint auto-fix
pnpm format                             # Prettier formatting
```

**Available Task**: Use "Run Frontend Dev Server" task in VS Code

### Git Hooks
- Pre-commit hook at `.githooks/pre-commit` (installed via `setup-hooks.sh`)
- Runs: `dotnet build`, `dotnet test`, and frontend build
- Blocks commits on failure

## Critical Conventions

1. **Backend Controller Convention**: All controllers use `[Route("api/[controller]")]` and `[ApiController]`
   - See [UserController.cs](backend/BlogAPI/Controllers/UserController.cs)

2. **Frontend API Routes**: Use Next.js App Router conventions
   - `GET` handlers in `route.ts` files
   - Manual method checking: `if (request.method !== 'GET') return 405`

3. **.NET SDK Version**: Locked to `10.0.100` in [global.json](backend/global.json)

4. **Error Handling**:
   - Backend: Global exception handler in [Middleware/GlobalExceptionHandler.cs](backend/BlogAPI/Middleware/GlobalExceptionHandler.cs)
   - Uses Problem Details (RFC 7807)

5. **CORS**: Configured via `AppConfigurations`, policy name `"AllowCorsPolicy"`

## Infrastructure & Deployment

### Current Infrastructure
- **Terraform**: Azure resources in `cloud-infrastructure/main.tf`
  - App Service Plan (Free tier F1)
  - Linux Web App for API
  - Entra External ID tenant (see `ENTRA_SETUP.md`)
- **Database**: PostgreSQL via Entity Framework Core with Npgsql

### Planned Deployment
- **GitHub Actions**: CI/CD pipeline planned for automated deployments
- **Authentication**: Azure Entra External ID integration pending infrastructure deployment
  - Pattern reference: `/Users/cdetcham/Projects/BookMe` (OAuth2 with JWT bearer tokens)
  - Configuration stub exists in `WebApplicationConfiguration.cs` (commented out)
  - See `cloud-infrastructure/entra-external.tf` for app registration setup

### .NET Aspire Migration
- **Current**: `AspireApp/` contains experimental Aspire setup
- **Migration Plan**: Transition from standalone BlogAPI to Aspire orchestration
- **Aspire Components**:
  - `AspireApp.AppHost` - Orchestration and service discovery
  - `AspireApp.ApiService` - API service (future home of BlogAPI)
  - `AspireApp.Web` - Frontend service (future home of Next.js app)
  - `AspireApp.ServiceDefaults` - Shared observability and resilience
- **When to Work in AspireApp**: Only when actively developing the migration path

## When Modifying Code

- **Adding NuGet packages**: Update version in `Directory.Packages.props`, reference WITHOUT version in `.csproj`
- **New backend service**: Register in appropriate `DependencyRegistrar.cs`
- **New entity**: Inherit from `BaseEntity`, add to DbContext, create migration
- **Frontend article**: Add markdown to `frontend/articles/` with frontmatter (title, date, category)
- **Health checks**: Add to `ConfigureHealthChecks()` in `HealthChecksConfiguration.cs`

## Testing Strategy

- **xUnit** for all .NET tests
- Integration tests use `WebApplicationFactory` pattern
- Frontend: **Vitest** preferred for testing (not yet configured)
