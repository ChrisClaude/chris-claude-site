using Application.Entities;
using HotChocolate.Data.Filters;

namespace BlogAPI.GraphQL.Filters;

#pragma warning disable CA1812
internal sealed class UserFilterType : FilterInputType<User>
{
    protected override void Configure(IFilterInputTypeDescriptor<User> descriptor)
    {
        ArgumentNullException.ThrowIfNull(descriptor);
        descriptor.BindFieldsExplicitly();
        descriptor.Field(u => u.Email);
        descriptor.Field(u => u.Name);
        descriptor.Field(u => u.Surname);
    }
}
#pragma warning restore CA1812
