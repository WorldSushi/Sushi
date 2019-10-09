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

        public ApplicationContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=31.31.196.202;Initial Catalog=u0720797_SushiWorld;User ID=u0720797_Roma;Password=Roma123");
                //optionsBuilder.UseSqlServer("Data Source=127.0.0.1;Initial Catalog=WebDispatchDB;Integrated Security=False;User ID=roma;Password=123;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Call>();
            modelBuilder.Entity<CallLog>();
            modelBuilder.Entity<MonthCallsInfo>();
            modelBuilder.Entity<MonthCallsInfoAsterics>();
            modelBuilder.Entity<CallInfo>();
            modelBuilder.Entity<CallsComment>();

            modelBuilder.Entity<CallPlan>();
            modelBuilder.Entity<BusinessTripPlan>();
            modelBuilder.Entity<ClientContact>();
            modelBuilder.Entity<WeekPlan>();
            modelBuilder.Entity<WorkGroup>();

            modelBuilder.Entity<Client>();
            modelBuilder.Entity<ClientPhone>();
            modelBuilder.Entity<ClientRevenue>();
            modelBuilder.Entity<ClientResume>();
            modelBuilder.Entity<ClientResumeWeek>();
            modelBuilder.Entity<ClientGR>();
            modelBuilder.Entity<ResultFriday>();

            modelBuilder.Entity<Manager>();
            modelBuilder.Entity<Admin>();
            modelBuilder.Entity<User>();

            modelBuilder.Entity<UserInfo>();
            modelBuilder.Entity<ClientInfo>();
            modelBuilder.Entity<ContactName>();
        }
    }
}
