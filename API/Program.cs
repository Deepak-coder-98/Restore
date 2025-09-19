using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddTransient<ExceptionMiddleware>();
var app = builder.Build();
var allowedOrigins = builder.Configuration["CorsOrigin:Allowed"];

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(opts =>
{
    opts.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(allowedOrigins ?? "https://localhost:3000");
});

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
