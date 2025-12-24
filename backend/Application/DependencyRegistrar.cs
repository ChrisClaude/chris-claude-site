using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyRegistrar
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // Register application services here

        return services;
    }
}
