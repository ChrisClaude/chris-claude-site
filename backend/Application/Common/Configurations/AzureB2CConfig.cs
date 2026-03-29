namespace Application.Common.Configurations;

public record AzureB2CConfig
{
    public required string TenantId { get; init; }
    public required string ClientId { get; init; }
    public required string ClientSecret { get; init; }
    public required string SignedOutCallbackPath { get; init; }
    public string? CallbackPath { get; init; }
}
