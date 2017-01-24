
using ChatSample.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SignalRWeb.Endpoints;
using SignalRWeb.Infrastructure;

namespace SignalRWeb
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);
            
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.Configure<TwitterConfig>(Configuration.GetSection("TwitterCredentials"));

            services.AddMvc();

            services.AddSockets();
            services.AddSignalR();


            services.AddSingleton<ChatEndpoint>();
            services.AddSingleton<ITwitterStreamManager,TwitterStreamManager>();
            
        }

        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }
            
            app.UseStaticFiles();        


            app.UseSignalR(routes =>
            {
                routes.MapHub<TwitterTrackHub>("/twittertrack");
            });

            app.UseSockets(r =>
           {
               r.MapEndpoint<ChatEndpoint>("/chatendpoint");
           });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
