using Application.Caching;
using Microsoft.Extensions.Caching.Memory;

namespace Infrastructure;

public class MemoryCacheManager(IMemoryCache memoryCache) : ICacheManager
{
    public Task AddAsync<T>(CacheKey key, T value)
    {
        ArgumentNullException.ThrowIfNull(key);
        var options = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(
                key.CacheTime > 0 ? key.CacheTime : 30
            ),
        };

        memoryCache.Set(key.Key, value, options);
        return Task.CompletedTask;
    }

    public Task RemoveAsync(string cacheKey)
    {
        memoryCache.Remove(cacheKey);
        return Task.CompletedTask;
    }

    public Task<bool> GetAsync<T>(CacheKey cacheKey, out T result)
    {
        ArgumentNullException.ThrowIfNull(cacheKey);
        if (memoryCache.TryGetValue(cacheKey.Key, out T? cached))
        {
            result = cached!;
            return Task.FromResult(true);
        }

        result = default!;
        return Task.FromResult(false);
    }
}
