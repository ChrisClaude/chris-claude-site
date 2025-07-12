using Application.Common;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        AppConfigurations appConfigurations
    )
    {
        services.AddDbContextPool<ApplicationContext>(opt =>
            opt.UseNpgsql(appConfigurations.DBConfig.PostgresConnectionString)
        );

        return services;
    }
}
