using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining
    <Application.Activities.Queries.GetActivityList>());
builder.Services.AddAutoMapper(cfg => { }, typeof(MappingProfiles).Assembly);

var app = builder.Build();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000"));
app.MapControllers();

// Create Database and seed it with initial data

// Scope services happen when HTTP requests come in, at start there are none so we create one ourselves
// It's important to use one scope per DataBase since DbContext is not thread-safe.
using var scope = app.Services.CreateScope();
// We need a scope because it can provide services such as AppDbContext and ILogger
// That way instead of creating a database we get the reactivities.db that we already have
var services = scope.ServiceProvider;
// This way we can make sure the Database is working before we start receiving HTTP requests
// The HTTP requests are sent from clients (app, browser, etc.) and ASP.NET Core handles them and 
// dishes out HTTP responses. For example, a client wants to create an Activity, he clicks "Create"
// which sends an HTTP request to ASP.NET Core. It handles it appropriately (by creating an activity,
// adding it to the DB, etc.) and returns a HTTP Response to the client - creating that Activity in the
// Browser

try
{
    // We get the Database and we apply the migrations. Migrations is basically changes to the DB.
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured when creating the database for the application");
}

app.Run();
