using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Manager>();
            modelBuilder.Entity<Admin>();
            modelBuilder.Entity<User>();
            modelBuilder.Entity<Client>();
            modelBuilder.Entity<CallPlan>();
            modelBuilder.Entity<BusinessTripPlan>();
            modelBuilder.Entity<ManagerForClient>();
            modelBuilder.Entity<WeekPlan>();
            modelBuilder.Entity<ClientContact>();
        }
    }
}
