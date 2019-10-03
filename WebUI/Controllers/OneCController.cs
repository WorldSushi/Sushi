using Data;
using Data.DTO.Clients;
using Data.Entities.Clients;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace WebUI.Controllers
{
    public class OneCController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public OneCController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("api.OneC/Resume")]
        public List<ClientResumeWeekDto> GetClientResumeWeek(string idClient, string year, string monthe )
        {
            List<ClientResumeWeekDto> clientResumeWeeks = _context.Set<ClientResumeWeek>()
                .Select(x => new ClientResumeWeekDto()
                {
                    ClientId = x.ClientId,
                    Date = x.Date,
                    Resume = x.Resume
                }).ToList();
            if(idClient != null && idClient != "")
            {
                clientResumeWeeks = clientResumeWeeks.Where(c => c.ClientId.ToString() == idClient).ToList();
            }
            int yearNumber;
            int monthNumber;
            if (int.TryParse(year, out yearNumber) && int.TryParse(monthe, out monthNumber))
            {
                clientResumeWeeks = clientResumeWeeks.Where(c => DateTime.Parse(c.Date).Year == yearNumber && DateTime.Parse(c.Date).Month == monthNumber).ToList();
            }
            return clientResumeWeeks;
        }
    }
}