using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base;
using Data;
using Data.Services.Abstract;
using Data.Services.Concrete;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

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

            var connection = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\Илья\\Documents\\SushiWorldDB.mdf;Integrated Security=True;Connect Timeout=30";

            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(connection, b => b.MigrationsAssembly("Data")));

            #region Services

            services.AddTransient<DbContext, ApplicationContext>();
            services.AddTransient(typeof(IRepository<>), typeof(EfRepository<>));

            services.AddTransient<IManagerService, ManagerService>();

            #endregion

            services.AddMvc();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
