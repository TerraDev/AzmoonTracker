using AzmoonTracker.Infrastacture;
using AzmoonTracker.Models;
using AzmoonTracker.Services;
using AzmoonTracker.Services.ExamRepository;
using AzmoonTracker.Services.TakeExamRepository;
using AzmoonTracker.Services.UserRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzmoonTracker
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<JWTConfig>(Configuration.GetSection("JWTConfig"));

            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
            Configuration.GetConnectionString("DefaultConnection"),
            b => b.MigrationsAssembly("AzmoonTracker.Infrastructure")));

            services.AddIdentityCore<AppUser>()
                .AddEntityFrameworkStores<AppDbContext>();
            // services.AddDefaultIdentity<ApplicationUser>(options=> //or <IdentityUser>
            //options.SignIn.RequireConfirmedAccount = true)
            //  .AddEntityFrameworkStores<AppDbContext>();
            // --> add package Microsoft.AspNetCore.Identity.UI

            services.AddScoped<IExamRepository, ExamRepository>();
            services.AddScoped<ITakeExamRepository, TakeExamRepository>();
            services.AddScoped<IUserRepository, UserRepository>();


            //Jwt Authentication
            var key = Encoding.ASCII.GetBytes(Configuration["JwtConfig:JWTSecret"]);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                RequireExpirationTime = false
                //ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x => {
                //x.RequireHttpsMetadata = false;

                x.SaveToken = true;
                x.TokenValidationParameters = tokenValidationParameters;
            });

            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
                builder.AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowAnyOrigin()
                       )) ;

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AzmoonTracker", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AzmoonTracker v1"));
            }

            app.UseHttpsRedirection();

            //here?
            app.UseCors("MyPolicy");

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
