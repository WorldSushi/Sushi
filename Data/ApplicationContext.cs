using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
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
            modelBuilder.Entity<Call>();
            modelBuilder.Entity<CallLog>();
            modelBuilder.Entity<MonthCallsInfo>();
            modelBuilder.Entity<CallInfo>();

            modelBuilder.Entity<CallPlan>();
            modelBuilder.Entity<BusinessTripPlan>();
            modelBuilder.Entity<ClientContact>();
            modelBuilder.Entity<WeekPlan>();
            modelBuilder.Entity<WorkGroup>();

            modelBuilder.Entity<Client>();
            modelBuilder.Entity<ClientPhone>();
            modelBuilder.Entity<ClientRevenue>();

            modelBuilder.Entity<Manager>();
            modelBuilder.Entity<Admin>();
            modelBuilder.Entity<User>();

            modelBuilder.Entity<UserInfo>();
            modelBuilder.Entity<ClientInfo>();
        }
    }
}
