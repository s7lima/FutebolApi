using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using FutebolApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Logging (console)
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Habilita CORS para desenvolvimento (AJUSTE em produção)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", p => p
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// Serviços
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API de Futebol",
        Version = "v1",
        Description = "API simples para gerenciar jogadores de futebol"
    });
});

var app = builder.Build();

// Mostrar página de erro detalhada em Development
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();
