using Application.Entities;
using HotChocolate.Data.Filters;

namespace BlogAPI.GraphQL.Filters;

#pragma warning disable CA1812
internal sealed class PostFilterType : FilterInputType<Post>
{
    protected override void Configure(IFilterInputTypeDescriptor<Post> descriptor)
    {
        ArgumentNullException.ThrowIfNull(descriptor);
        descriptor.BindFieldsExplicitly();
        descriptor.Field(p => p.Title);
        descriptor.Field(p => p.Status);
        descriptor.Field(p => p.Slug);
        descriptor.Field(p => p.AuthorId);
        descriptor.Field(p => p.PublishedAt);
        descriptor.Field(p => p.CreatedAt);
    }
}
#pragma warning restore CA1812
