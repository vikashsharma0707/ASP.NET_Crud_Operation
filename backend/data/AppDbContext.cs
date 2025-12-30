using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        // रनटाइम के लिए (Program.cs से यूज होता है)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // डिज़ाइन टाइम के लिए (EF migrations के लिए जरूरी)
        public AppDbContext()
        {
        }

        public DbSet<Employee> Employees { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                    "Server=localhost\\SQLEXPRESS;Database=EmployeeDB;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;Encrypt=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // सही मेथड: OnModelCreating (Configuring नहीं!)
            base.OnModelCreating(modelBuilder);
        }
    }
}