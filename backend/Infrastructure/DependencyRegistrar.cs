using Application.Common.Configurations;
using Application.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyRegistrar
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        AppConfigurations appConfigurations
    )
    {
#pragma warning disable IDE0058

        services.AddDbContextPool<ApplicationContext>(opt =>
            opt.UseNpgsql(appConfigurations.DBConfig.PostgresConnectionString)
        );
#pragma warning restore IDE0058

        services.AddScoped<ITransactionManager, TransactionManager>();

        return services;
    }
}
