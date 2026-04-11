using Application.Entities;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlogAPI.GraphQL.DataLoaders;

#pragma warning disable CA1812
internal sealed class UserByIdDataLoader : BatchDataLoader<Guid, User>
{
    private readonly IQueryableSource<User> _userSource;

    public UserByIdDataLoader(
        IQueryableSource<User> userSource,
        IBatchScheduler batchScheduler,
        DataLoaderOptions options
    )
        : base(batchScheduler, options)
    {
        _userSource = userSource;
    }

    protected override async Task<IReadOnlyDictionary<Guid, User>> LoadBatchAsync(
        IReadOnlyList<Guid> keys,
        CancellationToken cancellationToken
    )
    {
        return await _userSource
            .Query()
            .Where(u => keys.Contains(u.Id))
            .ToDictionaryAsync(u => u.Id, cancellationToken);
    }
}
#pragma warning restore CA1812
