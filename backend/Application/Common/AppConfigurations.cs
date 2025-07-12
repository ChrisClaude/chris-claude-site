using System;

namespace Application.Common;

public class AppConfigurations
{
    public DBConfig DBConfig { get; set; }
}

public class DBConfig
{
    public string PostgresConnectionString { get; set; }
    public string SqlServerConnectionString { get; set; }
}
