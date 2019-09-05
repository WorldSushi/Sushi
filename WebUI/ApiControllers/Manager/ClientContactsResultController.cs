using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.DTO.Clients;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class ClientContactsResultController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ClientContactsResultController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Call> calls = _context.Set<Call>().ToList();
            var result = await _context.Set<ClientContact>()
                .Where(x => DateHelper.IsCurrentMonth(x.Date))
                .GroupBy(x => x.ClientId)
                .Select(x => new ClientContactResultDto()
                {
                    ClientId = x.Key,
                    EscortCalls = x.Count(z => z.ManagerType == ManagerType.EscortManager
                                               && z.Type == ClientContactType.NoAcceptCall && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150),
                    EscortMails = x.Count(z => z.ManagerType == ManagerType.EscortManager
                                               && z.Type == ClientContactType.Mail && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150),
                    EscortWhatsUpMessages = x.Count(z => z.ManagerType == ManagerType.EscortManager
                                                         && z.Type == ClientContactType.WhatsUp && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150),
                    EscortTotalContacts = x.Count(z => z.ManagerType == ManagerType.EscortManager && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150),
                    RegionalCalls = x.Count(z => z.ManagerType == ManagerType.RegionalManager
                                                 && z.Type == ClientContactType.NoAcceptCall && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150),
                    RegionalMails = x.Count(z => z.ManagerType == ManagerType.RegionalManager
                                                 && z.Type == ClientContactType.Mail && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150),
                    RegionalWhatsUpMessages = x.Count(z => z.ManagerType == ManagerType.RegionalManager
                                                           && z.Type == ClientContactType.WhatsUp && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150),
                    RegionalTotalContacts = x.Count(z => z.ManagerType == ManagerType.RegionalManager && (calls.FirstOrDefault(c => c.ClientId == z.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == z.ClientId).Duration : 0) >= 150)
                }).ToListAsync();

                return Ok(result);
        }
    }
}