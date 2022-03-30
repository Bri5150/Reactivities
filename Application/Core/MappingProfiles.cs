using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(m => m.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(m => m.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(m => m.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}