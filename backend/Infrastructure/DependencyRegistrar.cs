using Application.Caching;
using Application.Events;
using Application.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyRegistrar
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        string connectionString
    )
    {
#pragma warning disable IDE0058

        services.AddDbContextPool<ApplicationContext>(opt => opt.UseNpgsql(connectionString));
#pragma warning restore IDE0058

        services.AddMemoryCache();
        services.AddScoped<ITransactionManager, TransactionManager>();
        services.AddScoped<IEventPublisher, EventPublisher>();
        services.AddScoped<ICacheManager, MemoryCacheManager>();
        services.AddScoped(typeof(IRepository<>), typeof(EntityRepository<>));

        return services;
    }
}
