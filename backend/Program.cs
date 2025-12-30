using Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// DbContext रजिस्टर करो
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS ऐड करो – React Frontend से कॉल करने के लिए जरूरी
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()   // localhost:3000 allow
              .AllowAnyMethod()   // GET, POST, PUT, DELETE सब
              .AllowAnyHeader();  // सब headers allow
    });
});

var app = builder.Build();

// Middleware pipeline
app.UseCors("AllowAll");  // CORS पहले

app.MapControllers();

app.Run();