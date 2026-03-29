using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Application.Common.Configurations;

public record AppConfigurations
{
    public DBConfig? DBConfig { get; init; }

    [Required]
    public required Collection<string> AllowedCorsOrigins { get; init; }

    [Required]
    public required AzureB2CConfig AzureAdB2C { get; init; }
}

public record DBConfig
{
    [Required]
    public required string SqlServerConnectionString { get; init; }
}
