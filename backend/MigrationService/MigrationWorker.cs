using System.Diagnostics.CodeAnalysis;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace MigrationService;

[SuppressMessage(
    "Performance",
    "CA1812:AvoidUninstantiatedInternalClasses",
    Justification = "Instantiated via dependency injection"
)]
internal sealed partial class MigrationWorker(
    IServiceProvider serviceProvider,
    IHostApplicationLifetime lifetime,
    ILogger<MigrationWorker> logger
) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        var pendingMigrations = await context.Database.GetPendingMigrationsAsync(stoppingToken);
        var pendingMigrationList = pendingMigrations.ToList();

        LogPendingMigrations(pendingMigrationList.Count);
        if (pendingMigrationList.Count == 0)
        {
            LogNoPendingMigrations();
            lifetime.StopApplication();
            return;
        }

        LogApplyingMigrations();
        await context.Database.MigrateAsync(stoppingToken);
        LogMigrationsApplied();

        lifetime.StopApplication();
    }

    [LoggerMessage(Level = LogLevel.Information, Message = "Applying database migrations...")]
    private partial void LogApplyingMigrations();

    [LoggerMessage(Level = LogLevel.Information, Message = "Pending migrations detected: {Count}")]
    private partial void LogPendingMigrations(int count);

    [LoggerMessage(Level = LogLevel.Information, Message = "No pending migrations found.")]
    private partial void LogNoPendingMigrations();

    [LoggerMessage(
        Level = LogLevel.Information,
        Message = "Database migrations applied successfully."
    )]
    private partial void LogMigrationsApplied();
}
