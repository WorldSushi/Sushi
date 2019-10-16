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
            var resultFriday = _context.Set<ResultFriday>().ToList();

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
            var cn = _context.Set<ContactName>().ToList();
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
                      ContactName = _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.ClientId) != null ? _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.ClientId).Name : "",
                      Position = _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.ClientId) != null ? _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.ClientId).Position : "",
                      FocusProducts = _context.Set<ClientResume>().FirstOrDefault(c => c.ClientId == x.ClientId) != null ? _context.Set<ClientResume>().FirstOrDefault(c => c.ClientId == x.ClientId).FocusProducts : "",
                      ResultFridays = resultFriday.FirstOrDefault(c => c.ClientIdd == x.ClientId) != null ? resultFriday.Where(c => c.ClientIdd == x.ClientId).ToList() : new List<ResultFriday>(),
                      WeekPlanDtoReg = _context.Set<WeekPlan>()
                        .Select(w=> new WeekPlanDto()
                        {
                            Id = w.Id,
                            ClientId = w.ClientId,
                            Plan = w.Plan,
                            Fact = w.Fact,
                            WeekNumber = w.WeekNumber,
                            ManagerType = w.ManagerType,
                            DateTime = w.Date.ToString("dd.MM.yyyy")
                        }).FirstOrDefault(w => w.ClientId == x.ClientId && w.ManagerType == ManagerType.RegionalManager),
                       WeekPlanDtoEsc = _context.Set<WeekPlan>()
                        .Select(w => new WeekPlanDto()
                        {
                            Id = w.Id,
                            ClientId = w.ClientId,
                            Plan = w.Plan,
                            Fact = w.Fact,
                            WeekNumber = w.WeekNumber,
                            ManagerType = w.ManagerType,
                            DateTime = w.Date.ToString("dd.MM.yyyy")
                        }).FirstOrDefault(w => w.ClientId == x.ClientId && w.ManagerType == ManagerType.EscortManager)
                   })
                   .OrderByDescending(x => x.ClientId)
                   //.Take(50)
                   .ToList();
                reachOutcomess.AddRange(result);
            }
            return Ok(reachOutcomess);
        }

        [HttpGet]
        [Route("AddFocusProduct")]
        public void AddFocusProduct(string idClient, string strfocusProduct)
        {
            if((idClient != null || idClient != ""))
            {
                ClientResume clientResume = _context.Set<ClientResume>().FirstOrDefault(c => c.ClientId.ToString() == idClient);
                if(clientResume != null)
                {
                    clientResume.FocusProducts = strfocusProduct;
                }
                else
                {
                    _context.Set<ClientResume>().Add(new ClientResume()
                    {
                        ClientId = Convert.ToInt32(idClient),
                        Client = _context.Set<Client>().FirstOrDefault(c => c.Id == Convert.ToInt32(idClient)),
                        FocusProducts = strfocusProduct
                    });
                }
                _context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("AddResuldFriyDay")]
        public void AddResuldFriyDay(string idClient, string strResuldFriyDay, string date)
        {
            if ((idClient != null || idClient != "") && (strResuldFriyDay != null))
            {
                ResultFriday resultFriday = _context.Set<ResultFriday>().Where(r => r.ClientIdd.ToString() == idClient).FirstOrDefault(r => r.DataFriday == date);
                if(resultFriday != null)
                {
                    resultFriday.ResumeFriday = strResuldFriyDay;
                }
                else
                {
                    _context.Set<ResultFriday>().Add(new ResultFriday()
                    {
                        ClientIdd = Convert.ToInt32(idClient),
                        DataFriday = date,
                        ResumeFriday = strResuldFriyDay
                    });
                }
                _context.SaveChanges();
            }
        }
    }
}