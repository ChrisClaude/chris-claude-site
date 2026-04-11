using Application.Entities;
using HotChocolate.Data.Sorting;

namespace BlogAPI.GraphQL.Sorting;

#pragma warning disable CA1812
internal sealed class UserSortType : SortInputType<User>
{
    protected override void Configure(ISortInputTypeDescriptor<User> descriptor)
    {
        ArgumentNullException.ThrowIfNull(descriptor);
        descriptor.BindFieldsExplicitly();
        descriptor.Field(u => u.Email);
        descriptor.Field(u => u.Name);
        descriptor.Field(u => u.Surname);
    }
}
#pragma warning restore CA1812
