using ChatAppServer.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatAppServer.Data
{
    public class ChatAppDbContext : DbContext
    {
        public ChatAppDbContext(DbContextOptions<ChatAppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Channel>? Channels { get; set; }
        public DbSet<Message>? Messages { get; set; }
    }
}
