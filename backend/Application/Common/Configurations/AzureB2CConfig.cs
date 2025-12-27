namespace Application.Common.Configurations;

public record AzureB2CConfig
{
    public required string Instance { get; init; }
    public required string Domain { get; init; }
    public required string TenantId { get; init; }
    public required string ClientId { get; init; }
    public required string ClientSecret { get; init; }
    public required string CallbackPath { get; init; }
    public required string SignedOutCallbackPath { get; init; }
    public required string SignUpSignInPolicyId { get; init; }
}
