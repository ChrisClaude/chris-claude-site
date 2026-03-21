using System;
using System.Threading.RateLimiting;
using Serilog;

namespace BlogAPI.Configurations;

internal static class RateLimiterConfiguration
{
#pragma warning disable S1135 // Track uses of "TODO" tags
    // TODO: Test rate limiting with JMeter and Azure Load Testing https://learn.microsoft.com/en-us/aspnet/core/performance/rate-limit?view=aspnetcore-10.0#testing-endpoints-with-rate-limiting
    public static IServiceCollection ConfigureRateLimiter(this IServiceCollection services)
#pragma warning restore S1135 // Track uses of "TODO" tags
    {
        services.AddRateLimiter(options =>
        {
            options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(
                httpContext =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: httpContext.Connection.RemoteIpAddress?.ToString()
                            ?? "unknown"
                            ?? httpContext.Request.Headers.Host.ToString(),
                        factory: partition => new FixedWindowRateLimiterOptions
                        {
                            AutoReplenishment = true,
                            PermitLimit = 100,
                            QueueLimit = 0,
                            Window = TimeSpan.FromMinutes(1),
                        }
                    )
            );

            options.OnRejected = async (context, cancellationToken) =>
            {
                // Custom rejection handling logic
                context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                context.HttpContext.Response.Headers.RetryAfter = "60";

                await context.HttpContext.Response.WriteAsync(
                    "Rate limit exceeded. Please try again later.",
                    cancellationToken
                );

                // Optional logging
                Log.Warning(
                    "Rate limit exceeded for IP: {IpAddress}",
                    context.HttpContext.Connection.RemoteIpAddress
                );
            };
        });

        return services;
    }
}
