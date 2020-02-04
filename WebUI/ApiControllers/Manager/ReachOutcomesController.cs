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

        [HttpGet]
        [Route("SavePhones")]
        public void SavePhones(string idClient, string strPhones)
        {
            if ((idClient != null || idClient != ""))
            {
                int clientId;
                if (int.TryParse(idClient, out clientId))
                {
                    var clientPhones = _context.Set<ClientPhone>().Where(z => z.ClientId == clientId).ToList();
                    var client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientId);
                    var phonesArray = strPhones?.Split(',').ToList() ?? new List<string>() { "", "" };

                    if (clientPhones.Count() != 0)
                    {
                        var minCount = clientPhones.Count() >= phonesArray.Count() ? phonesArray.Count() : clientPhones.Count();

                        for (int i = 0; i < minCount; i++)
                        {
                            clientPhones[i].Phone = phonesArray[i];
                        }

                        if (clientPhones.Count() < phonesArray.Count())
                        {
                            List<ClientPhone> addPhones = new List<ClientPhone>();

                            for (int i = minCount; i < phonesArray.Count(); i++)
                            {
                                addPhones.Add(new ClientPhone() { ClientId = clientId, Phone = phonesArray[i], Client = client });
                            }

                            _context.Set<ClientPhone>().AddRange(addPhones);
                        }
                        //else if (clientPhones.Count() > phonesArray.Count())
                        //{
                        //    List<ClientPhone> deletedPhones = new List<ClientPhone>();

                        //    for (int i = minCount; i < clientPhones.Count(); i++)
                        //    {
                        //        deletedPhones.Add(clientPhones[i]);
                        //    }
                        //    _context.Set<ClientPhone>().RemoveRange(deletedPhones);
                        //}                                              
                    }
                    else
                    {
                        List<ClientPhone> addPhones = new List<ClientPhone>();
                        foreach (var phone in phonesArray)
                        {
                            addPhones.Add(new ClientPhone()
                            {
                                ClientId = clientId,
                                Client = client,
                                Phone = phone
                            });
                        }
                        _context.Set<ClientPhone>().AddRange(addPhones);
                    }
                    _context.SaveChanges();
                }
            }
        }

        [HttpGet]
        [Route("SavePositions")]
        public void SavePositions(string idClient, string strPositions)
        {
            if ((idClient != null || idClient != ""))
            {
                int clientId;
                if (int.TryParse(idClient, out clientId))
                {
                    var phonesArray = strPositions?.Split(',').ToList() ?? new List<string>() { "", "" };

                    string name, position = string.Empty;

                    switch (phonesArray.Count())
                    {
                        case 0: name = string.Empty; position = string.Empty; break;
                        case 1: name = phonesArray[0]; position = string.Empty; break;
                        case 2: name = phonesArray[0]; position = phonesArray[1]; break;
                        default: name = phonesArray[0]; position = phonesArray[1]; break;
                    }

                    ContactName contactName = _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == clientId);

                    if (contactName != null)
                    {
                        contactName.Name = name;
                        contactName.Position = position;

                        _context.SaveChanges();
                    }
                    else
                    {
                        _context.Set<ContactName>().Add(new ContactName() { ClientId = clientId, Name = name, Position = position });
                    }
                    _context.SaveChanges();
                }
            }
        }
    }
}