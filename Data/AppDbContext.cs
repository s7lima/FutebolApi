using Microsoft.EntityFrameworkCore;
using FutebolApi.Models;

namespace FutebolApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Jogador> Jogadores { get; set; }
    }
}
