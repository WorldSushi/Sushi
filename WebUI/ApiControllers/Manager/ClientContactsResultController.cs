using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.DTO.Clients;
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
            var result = await _context.Set<ClientContact>()
                .Where(x => DateHelper.IsCurrentMonth(x.Date))
                .GroupBy(x => x.ClientId)
                .Select(x => new ClientContactResultDto()
                {
                    ClientId = x.Key,
                    EscortCalls = x.Count(z => z.ManagerType == ManagerType.EscortManager
                                               && z.Type == ClientContactType.Call),
                    EscortMails = x.Count(z => z.ManagerType == ManagerType.EscortManager
                                               && z.Type == ClientContactType.Mail),
                    EscortWhatsUpMessages = x.Count(z => z.ManagerType == ManagerType.EscortManager
                                                         && z.Type == ClientContactType.WhatsUp),
                    EscortTotalContacts = x.Count(z => z.ManagerType == ManagerType.EscortManager),
                    RegionalCalls = x.Count(z => z.ManagerType == ManagerType.RegionalManager
                                                 && z.Type == ClientContactType.Call),
                    RegionalMails = x.Count(z => z.ManagerType == ManagerType.RegionalManager
                                                 && z.Type == ClientContactType.Mail),
                    RegionalWhatsUpMessages = x.Count(z => z.ManagerType == ManagerType.RegionalManager
                                                           && z.Type == ClientContactType.WhatsUp),
                    RegionalTotalContacts = x.Count(z => z.ManagerType == ManagerType.RegionalManager)
                }).ToListAsync();

            return Ok(result);
        }
    }
}