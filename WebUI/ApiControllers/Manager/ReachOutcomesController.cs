using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.Users;
using Data.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class ReachOutcomesController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IAccountInformationService _accountInformationService;

        public ReachOutcomesController(ApplicationContext context,
            IAccountInformationService accountInformationService)
        {
            _context = context;
            _accountInformationService = accountInformationService;
        }


        [HttpGet]
        public IActionResult Get()
        {
            List<ReachOutcomesDto> reachOutcomess = new List<ReachOutcomesDto>();
            var managerId = _accountInformationService.GetOperatorId();
            User user = _context.Set<User>().ToList().FirstOrDefault(m => m.Id == managerId);
            var clientPhones = _context.Set<ClientPhone>().ToList();

            List<WorkGroup> workGroups = null;
            if (((Data.Entities.Users.Manager)user).typeManager == TypeManager.Manager)
            {
                workGroups =  _context.Set<WorkGroup>()
                .Where(x => x.RegionalManagerId == managerId
                                          || x.EscortManagerId == managerId).ToList();
            }
            else if (((Data.Entities.Users.Manager)user).typeManager == TypeManager.Marketolog)
            {
                workGroups = _context.Set<WorkGroup>().ToList();
            }

            foreach (WorkGroup workGroup in workGroups)
            {
                var result = _context.Set<ClientWorkGroup>()
                   .Where(x => x.WorkGroupId == workGroup.Id && (x.Client.IsCoverage != null || x.Client.IsCoverage != "" ? Convert.ToBoolean(x.Client.IsCoverage) : false))
                   .Select(x => new ReachOutcomesDto()
                   {
                      ClientId = x.ClientId.ToString(),
                      NameClient = x.Client.LegalEntity,
                      Phones = clientPhones.Where(z => z.ClientId == x.ClientId)
                           .Select(z => new ClientPhoneDTO
                           {
                               Id = z.Id,
                               Phone = z.Phone
                           }).ToList(),
                   })
                   .OrderByDescending(x => x.ClientId)
                   //.Take(50)
                   .ToList();
                reachOutcomess.AddRange(result);
            }
            return Ok(reachOutcomess);
        }
    }
}