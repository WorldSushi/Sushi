using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.ClientContact;
using Data.DTO.Clients;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Users;
using Data.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class ClientContactController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IAccountInformationService _accountInformationService;

        public ClientContactController(ApplicationContext context,
            IAccountInformationService accountInformationService)
        {
            _context = context;
            _accountInformationService = accountInformationService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<CallClient> callsClient = _context.Set<CallClient>().ToList();
            List<CallManager> callsManagers = _context.Set<CallManager>().ToList();
            var managerId = _accountInformationService.GetOperatorId();
            User user = _context.Set<User>().ToList().FirstOrDefault(m => m.Id == managerId);
            List<ClientContactDto> result = null;

            if (user is Data.Entities.Users.Admin || (((Data.Entities.Users.Manager)user).typeManager == TypeManager.Call_Checker || ((Data.Entities.Users.Manager)user).typeManager == TypeManager.Admin))
            {
                result = await _context.Set<ClientContact>()
                   .Select(x => new ClientContactDto()
                   {
                       Id = x.Id,
                       ClientId = (int)x.ClientId,
                       ContactType = x.Type,
                       Date = x.Date.ToString("dd.MM.yyyy"),
                       ManagerType = x.ManagerType,
                       ManagerId = x.ManagerId,
                       Durations = callsClient.FirstOrDefault(c => c.Id == x.CallId) != null ? callsClient.FirstOrDefault(c => c.Id == x.CallId).Duration : 0,
                       //IsAccept = x.IsAccept
                   }).ToListAsync();
                result.AddRange(_context.Set<ContactManager>()
                   .Select(x => new ClientContactDto()
                   {
                       Id = x.Id,
                       ClientId = x.ManagerIdC,
                       ContactType = x.Type,
                       Date = x.Date.ToString("dd.MM.yyyy"),
                       ManagerType = x.ManagerType,
                       ManagerId = x.ManagerId,
                       Durations = callsManagers.FirstOrDefault(c => c.Id == x.CallId) != null ? callsManagers.FirstOrDefault(c => c.Id == x.CallId).Duration : 0,
                       //IsAccept = x.IsAccept
                   }).ToList());
            }
            else if (user is Data.Entities.Users.Manager && (((Data.Entities.Users.Manager)user).typeManager == TypeManager.Manager || ((Data.Entities.Users.Manager)user).typeManager == TypeManager.Marketolog))
            {
                WorkGroup workGroups = _context.Set<WorkGroup>()
                .FirstOrDefault(x => x.RegionalManagerId == managerId
                                          || x.EscortManagerId == managerId);
                result = await _context.Set<ClientContact>()
                   .Where(x => x.ManagerId == workGroups.EscortManagerId || x.ManagerId == workGroups.RegionalManagerId)
                   .Select(x => new ClientContactDto()
                   {
                       Id = x.Id,
                       ClientId = (int)x.ClientId,
                       ContactType = x.Type,
                       Date = x.Date.ToString("dd.MM.yyyy"),
                       ManagerType = x.ManagerType,
                       ManagerId = x.ManagerId,
                       Durations = callsClient.FirstOrDefault(c => c.Id == x.CallId) != null ? callsClient.FirstOrDefault(c => c.Id == x.CallId).Duration : 0,
                       //IsAccept = x.IsAccept
                   }).ToListAsync();
                result.AddRange(_context.Set<ContactManager>()
                  .Where(x => x.ManagerId == workGroups.EscortManagerId || x.ManagerId == workGroups.RegionalManagerId)
                  .Select(x => new ClientContactDto()
                  {
                      Id = x.Id,
                      ClientId = x.ManagerIdC,
                      ContactType = x.Type,
                      Date = x.Date.ToString("dd.MM.yyyy"),
                      ManagerType = x.ManagerType,
                      ManagerId = x.ManagerId,
                      Durations = callsManagers.FirstOrDefault(c => c.Id == x.CallId) != null ? callsManagers.FirstOrDefault(c => c.Id == x.CallId).Duration : 0,
                      //IsAccept = x.IsAccept
                  }).ToList());
            }
                return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientContactCreate command)
        {
            var clientContact = await _context.Set<ClientContact>()
                .FirstOrDefaultAsync(x => x.Id == command.Id
                                          && x.ClientId == command.ClientId
                                          && x.ManagerType == command.ManagerType
                                          && x.Date.Date == DateTime.Now.Date.Date);

            if (clientContact != null)
            {
                clientContact.Type = command.ContactType;
                await _context.SaveChangesAsync();
                return Ok(null);
            }

            /*command.ManagerId = _context.Set<ManagerForClient>()
                .FirstOrDefault(x => x.ClientId == command.ClientId && x.Type == command.ManagerType)
                .Id;*/

            var workGroup = await _context.Set<ClientWorkGroup>()
                .Where(x => x.ClientId == command.ClientId)
                .Select(x => new
                {
                    RegionalManagerId = x.WorkGroup.RegionalManagerId,
                    EscortManagerId = x.WorkGroup.EscortManagerId
                }).FirstOrDefaultAsync();

            if (command.ManagerType == ManagerType.EscortManager)
                command.ManagerId = (int)workGroup.EscortManagerId;
            else if (command.ManagerType == ManagerType.RegionalManager)
                command.ManagerId = (int) workGroup.RegionalManagerId;
            else
                return BadRequest("Не указана роль менеджера");

            var newClientContact = await _context.Set<ClientContact>()
                .AddAsync(new ClientContact(command));

            await _context.SaveChangesAsync();

            var result = new ClientContactDto()
            {
                Id = newClientContact.Entity.Id,
                ClientId = (int)newClientContact.Entity.ClientId,
                ContactType = newClientContact.Entity.Type,
                Date = newClientContact.Entity.Date.ToString("dd.MM.yyyy"),
                ManagerType = newClientContact.Entity.ManagerType
            };

            return Ok(result);
        } 

        private int GetAccount()
        {
            var response = new
            {
                Id = _accountInformationService.CurrentUser().Id,
                Login = _accountInformationService.CurrentUser().Login,
                Role = _accountInformationService.CurrentUser() is Data.Entities.Users.Admin
                    ? "Admin"
                    : "Manager",
                Workgroup = _accountInformationService.CurrentUser() is Data.Entities.Users.Admin
                    ? null
                    : _context.Set<WorkGroup>()
                        .FirstOrDefault(x => x.EscortManagerId == _accountInformationService.GetOperatorId() || x.RegionalManagerId == _accountInformationService.GetOperatorId())
            };
            return response.Id;
        }
    }
}