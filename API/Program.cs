using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
var app = builder.Build();
var allowedOrigins = builder.Configuration["CorsOrigin:Allowed"];
// Configure the HTTP request pipeline.
app.UseCors(opts =>
{
    opts.AllowAnyHeader().AllowAnyMethod().WithOrigins(allowedOrigins);
});

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();
