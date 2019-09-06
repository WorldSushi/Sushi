using Base;
using Data;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;
using Data.Services.Concrete;
using Data.Services.Concrete.ClientContacts;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebUI.Services.Abstract;
using WebUI.Services.Concrete;

namespace WebUI
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = new Microsoft.AspNetCore.Http.PathString("/Account/Index");
                });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot";
            });

            var connection =
                //"Data Source=DESKTOP-MEBU400\\SQLEXPRESS;Initial Catalog=SushiWorldSystem;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
                //"Data Source=DESKTOP-MEBU400\\SQLEXPRESS;Initial Catalog=sushiImportTest;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
                "Data Source=31.31.196.202;Initial Catalog=u0720797_sushi_test;User ID=u0720797_sushi_test;Password=sushi_test1";
                // @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\DB\SushiWorld.mdf;Integrated Security=True;Connect Timeout=30";

            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(connection, b => b.MigrationsAssembly("Data")));

            #region Services

            services.AddTransient<DbContext, ApplicationContext>();
            services.AddTransient(typeof(IRepository<>), typeof(EfRepository<>));

            services.AddTransient<IManagerService, ManagerService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IAccountInformationService, AccountInformationService>();
            services.AddTransient<IClientService, ClientService>();
            services.AddTransient<IMyCallsAPIService, MyCallsAPIService>();
            services.AddTransient<IMyCallsAPIServiceAstrics, MyCallsAPIServiceAstrics>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IMonthlyCallService, MonthlyCallService>();
            services.AddTransient<IMonthlyCallPlanService, MonthlyCallPlanService>();
            services.AddTransient<IMonthlyBusinessTripService, MonthlyBusinessTripPlanService>();
            services.AddTransient<IWeekPlanService, WeekPlanService>();
            #endregion

            services.AddCors(o => o.AddPolicy("MyPolicy", builder => {
                builder.AllowAnyHeader()
                       .AllowAnyMethod()
                       .AllowAnyOrigin();
            }));

            services.AddMvc();

            services.AddMemoryCache();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(options => options.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

            app.UseDeveloperExceptionPage();

            /*if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();*/

            app.UseStaticFiles();

            app.UseAuthentication();
           
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
