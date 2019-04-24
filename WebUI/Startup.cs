using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
using Microsoft.AspNetCore.SpaServices.AngularCli;
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
                    options.LoginPath = new Microsoft.AspNetCore.Http.PathString("/login");
                });

            var connection = //"Data Source=DESKTOP-MEBU400\\SQLEXPRESS;Initial Catalog=SushiWorld;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
                //"Data Source=31.31.196.160;Initial Catalog=u0703742_sushiWorld;User ID=u0703742_admin;Password=barnaul2019";
                "Data Source=sushiworld.database.windows.net;Initial Catalog=SushiWorld;User ID=SushiWorld;Password=barnaul2019!;Connect Timeout=60;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

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
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddTransient<IMonthlyCallService, MonthlyCallService>();
            services.AddTransient<IMonthlyCallPlanService, MonthlyCallPlanService>();
            #endregion

            services.AddCors();

            services.AddMvc();

            services.AddMemoryCache();

            services.AddSpaStaticFiles(configuration => configuration.RootPath = "wwwroot");
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();

            /*if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();*/

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "wwwroot";

                /*spa.UseAngularCliServer(npmScript: "start");

                spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");*/
            });
        }
    }
}
