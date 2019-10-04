using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.Users;
using Data.Enums;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IAccountInformationService _accountInformationService;
        private readonly IMyCallsAPIService _myCallsApiService;
        private readonly IMyCallsAPIServiceAstrics _myCallsAPIServiceAstrics;

        public ClientController(ApplicationContext context,
            IAccountInformationService accountInformationService,
            IMyCallsAPIService myCallsApiService,
            IMyCallsAPIServiceAstrics myCallsAPIServiceAstrics)
        {
            _context = context;
            _accountInformationService = accountInformationService;
            _myCallsApiService = myCallsApiService;
            _myCallsAPIServiceAstrics = myCallsAPIServiceAstrics;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<ClientDto> clientsDto = new List<ClientDto>();
            var managerId = _accountInformationService.GetOperatorId();
            User user = _context.Set<User>().ToList().FirstOrDefault(m => m.Id == managerId);
            _myCallsApiService.SaveNewCalls();
            _myCallsAPIServiceAstrics.SaveNewCalls();

            List<WorkGroup> workGroups = null;
            if (((Data.Entities.Users.Manager)user).typeManager == TypeManager.Manager)
            {
                workGroups = await _context.Set<WorkGroup>()
                .Where(x => x.RegionalManagerId == managerId
                                          || x.EscortManagerId == managerId).ToListAsync();
            }
            else if (((Data.Entities.Users.Manager)user).typeManager == TypeManager.Marketolog)
            {
                workGroups = await _context.Set<WorkGroup>().ToListAsync();
            }
            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();
            foreach (WorkGroup workGroup in workGroups)
            {
                var result = await _context.Set<ClientWorkGroup>()
                   .Where(x => x.WorkGroupId == workGroup.Id)
                   .Select(x => new ClientDto()
                   {
                       Id = x.Client.Id,
                       Title = x.Client.Title,
                       LegalEntity = x.Client.LegalEntity,
                       Phones = clientPhones.Where(z => z.ClientId == x.ClientId)
                           .Select(z => new ClientPhoneDTO
                           {
                               Id = z.Id,
                               Phone = z.Phone
                           }).ToList(),
                       ClientType = x.Client.ClientType,
                       NumberOfCalls = x.Client.NumberOfCalls,
                       NumberOfShipments = x.Client.NumberOfShipments,
                       Group = (int)x.Client.Group,
                       NomenclatureAnalysis = new NomenclatureAnalysis()
                       {
                           Id = 1,
                           ReportPrevMonth = 50,
                           ReportAvg5Months = 50,
                           PrevMonth = 20,
                           Avg5Months = 20,
                           ClientId = x.Id
                       },
                       IsCoverage = x.Client.IsCoverage != null || x.Client.IsCoverage != "" ? Convert.ToBoolean(x.Client.IsCoverage) : false
                   })
                   .OrderByDescending(x => x.NumberOfCalls)
                   //.Take(50)
                   .ToListAsync();
                clientsDto.AddRange(result);
            }
            return Ok(clientsDto);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientCreate command)
        {
            var currentManagerId = _accountInformationService.GetOperatorId();

            var client = await _context.Set<Client>()
                .AddAsync(new Client(command));



            var workGroup = await _context.Set<WorkGroup>()
                .FirstOrDefaultAsync(x => x.EscortManagerId == currentManagerId
                                          || x.RegionalManagerId == currentManagerId);

            workGroup.BindClient(new BindClient()
            {
                ClientId = client.Entity.Id,
                WorkgroupId = workGroup.Id
            });

            foreach (var phone in command.Phones)
            {
                await _context.Set<ClientPhone>()
                .AddAsync(new ClientPhone()
                {
                    ClientId = client.Entity.Id,
                    Phone = phone.Phone
                });
            }

            await _context.SaveChangesAsync();

            var result = new ClientDto
            {
                Id = client.Entity.Id,
                Title = client.Entity.Title,
                LegalEntity = client.Entity.LegalEntity,
                ClientType = client.Entity.ClientType,
                NumberOfCalls = client.Entity.NumberOfCalls,
                NumberOfShipments = client.Entity.NumberOfShipments,
                Group = (int)client.Entity.Group,
                Phones = _context.Set<ClientPhone>().Where(z => z.ClientId == client.Entity.Id).Select(z => new ClientPhoneDTO
                {
                    Id = z.Id,
                    Phone = z.Phone
                }).ToList(),
            };

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ClientEdit command)
        {
            var client = await _context.Set<Client>()
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            client.Edit(command);

            foreach (var phone in command.Phones)
            {
                if (phone.Deleted == true && phone.Id > 0)
                {
                    var deletingPhone = _context.Set<ClientPhone>().FirstOrDefault(x => x.Id == phone.Id);

                    _context.Set<ClientPhone>().Remove(deletingPhone);
                }
                else if (phone.Id > 0 && phone.Deleted == false)
                {
                    var editingPhone = _context.Set<ClientPhone>().FirstOrDefault(x => x.Id == phone.Id);

                    editingPhone.Phone = phone.Phone;

                    _context.Update(editingPhone);
                }
                else if (phone.Id == 0 && phone.Deleted == false)
                {
                    await _context.Set<ClientPhone>().AddAsync(new ClientPhone
                    {
                        Phone = phone.Phone,
                        ClientId = phone.ClientId
                    });
                }

            }

            await _context.SaveChangesAsync();

            var result = new ClientDto()
            {
                Id = client.Id,
                ClientType = client.ClientType,
                HasWorkgroup = true,
                LegalEntity = client.LegalEntity,
                NumberOfCalls = client.NumberOfCalls,
                NumberOfShipments = client.NumberOfShipments,
                Phones = _context.Set<ClientPhone>().Where(x => x.ClientId == client.Id)
                    .Select(z => new ClientPhoneDTO
                    {
                        Id = z.Id,
                        ClientId = z.ClientId,
                        Phone = z.Phone
                    }).ToList(),
                Title = client.Title,
                Group = (int)client.Group
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("Coverage")]
        public void SetCoverage(string isCoverage, string idClient)
        {
            Client client = _context.Set<Client>().FirstOrDefault(c => c.Id.ToString() == idClient);
            if (client != null)
            {
                client.IsCoverage = isCoverage.ToString();
                _context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("AddResume")]
        public void AddResume(string idClient, string strResume)
        {
            if(idClient != null && idClient != "")
            {
                ClientResumeWeek clientResumeWeek = _context.Set<ClientResumeWeek>()
                    .Where(c => c.ClientId.ToString() == idClient)
                    .FirstOrDefault(c => (c.Date != null || c.Date != "") && (DateTime.Parse(c.Date).Year == DateTime.Now.Year && DateTime.Parse(c.Date).Month == DateTime.Now.Month));
                if(clientResumeWeek != null)
                {
                    clientResumeWeek.Resume = strResume;
                }
                else
                {
                    _context.Set<ClientResumeWeek>().Add(new ClientResumeWeek()
                    {
                        Resume = strResume,
                        Client = _context.Set<Client>().FirstOrDefault(c => c.Id.ToString() == idClient),
                        ClientId = Convert.ToInt32(idClient),
                        Date = DateTime.Now.ToString()
                    });
                }
                _context.SaveChanges();
            }
        }

        [HttpGet]
        [Route("Resume")]
        public IActionResult GetResume(string idClient)
        {
            ClientResumeWeek clientResumeWeek = null;
            if (idClient != null && idClient != "")
            {
                clientResumeWeek = _context.Set<ClientResumeWeek>()
                    .FirstOrDefault(c => c.ClientId.ToString() == idClient && (DateTime.Parse(c.Date).Year == DateTime.Now.Year && DateTime.Parse(c.Date).Month == DateTime.Now.Month));
            }
            if(clientResumeWeek != null)
            {
                return Ok(new ClientResumeWeekDto()
                {
                    ClientId = clientResumeWeek.ClientId.ToString(),
                    Date = clientResumeWeek.Date,
                    Resume = clientResumeWeek.Resume
                });
            }
            else
            {
                return Ok(new ClientResumeWeekDto() { });
            }
        }
    }
}