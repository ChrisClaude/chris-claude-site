namespace Application.Enums;

public static class Constant
{
    public const string HTTP_CONTEXT_USER_ITEM_KEY = "AuthenticatedUser";
}

public static class AuthPolicy
{
    public const string ADMIN = "Admin";
    public const string PUBLISHER = "Publisher";
    public const string READER = "Reader";
}

public static class RoleName
{
    public const string ADMIN = "Admin";
    public const string PUBLISHER = "Publisher";
    public const string READER = "Reader";

    public static IReadOnlyList<string> All { get; } = [ADMIN, PUBLISHER, READER];
}

public static class RoleIds
{
    public static readonly Guid ADMIN = new("00000000-0000-0000-0000-000000000001");
    public static readonly Guid PUBLISHER = new("00000000-0000-0000-0000-000000000002");
    public static readonly Guid READER = new("00000000-0000-0000-0000-000000000003");
}
