using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;
using InfraStructure.Security;
using InfraStructure.Photos;
namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            services.AddDbContext<DataContext>(opt => 
           {
               opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
           });

           services.AddCors(opt => {
               opt.AddPolicy("CorsPolicy", policy => 
               {
                   policy
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowAnyOrigin()
                   .AllowCredentials()
                   .WithOrigins("http://localhost:3000");

               });

           });
           
           services.AddMediatR(typeof(List.Handler).Assembly);
           services.AddAutoMapper(typeof(MappingProfiles).Assembly);
           services.AddScoped<IUserAccessor, UserAccessor>();
           services.AddScoped<IPhotoAccessor, PhotoAccessor>();
           services.Configure<CloudinarySetttings>(config.GetSection("Cloudinary"));
           services.AddSignalR();

           return services;
        }
    }
}