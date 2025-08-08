using System;

namespace Application.Caching;

public interface ICacheManager
{
    Task AddAsync<T>(CacheKey key, T value);

    Task RemoveAsync(string cacheKey);

    Task<bool> GetAsync<T>(CacheKey cacheKey, out T result);
}
