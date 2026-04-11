using Application.Entities;
using HotChocolate.Data.Sorting;

namespace BlogAPI.GraphQL.Sorting;

#pragma warning disable CA1812
internal sealed class PostSortType : SortInputType<Post>
{
    protected override void Configure(ISortInputTypeDescriptor<Post> descriptor)
    {
        ArgumentNullException.ThrowIfNull(descriptor);
        descriptor.BindFieldsExplicitly();
        descriptor.Field(p => p.PublishedAt);
        descriptor.Field(p => p.CreatedAt);
        descriptor.Field(p => p.Title);
    }
}
#pragma warning restore CA1812
