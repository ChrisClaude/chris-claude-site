using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using MigrationService;

var builder = Host.CreateApplicationBuilder(args);

builder.AddServiceDefaults();

var connectionString =
    builder.Configuration.GetConnectionString("blog-db")
    ?? throw new InvalidOperationException(
        "No connection string found. Provide 'ConnectionStrings:blog-db'."
    );

builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));
builder.Services.AddHostedService<MigrationWorker>();

var host = builder.Build();
await host.RunAsync();
