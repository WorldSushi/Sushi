using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
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

        public ClientController(ApplicationContext context,
            IAccountInformationService accountInformationService,
            IMyCallsAPIService myCallsApiService)
        {
            _context = context;
            _accountInformationService = accountInformationService;
            _myCallsApiService = myCallsApiService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var managerId = _accountInformationService.GetOperatorId();

            _myCallsApiService.SaveNewCalls();

            var workGroup = await _context.Set<WorkGroup>()
                .FirstOrDefaultAsync(x => x.RegionalManagerId == managerId
                                          || x.EscortManagerId == managerId);

            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();

            var result = await _context.Set<ClientWorkGroup>()
                .Where(x => x.WorkGroupId == workGroup.Id)
                .Select(x => new ClientDto()
                {
                    Id = x.Client.Id,
                    Title = x.Client.Title,
                    LegalEntity = x.Client.LegalEntity,
                    Phone = clientPhones.Any(z => z.ClientId == x.ClientId)
                        ? clientPhones.FirstOrDefault(z => z.ClientId == x.ClientId).Phone
                        : "",
                    ClientType = x.Client.ClientType,
                    NumberOfCalls = x.Client.NumberOfCalls,
                    NumberOfShipments = x.Client.NumberOfShipments
                })
                .OrderByDescending(x => x.NumberOfCalls)
                //.Take(50)
                .ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientCreate command)
        {
            var currentManagerId = _accountInformationService.GetOperatorId();

            var client = await _context.Set<Client>()
                .AddAsync(new Client(command));

            await _context.Set<ClientPhone>()
                .AddAsync(new ClientPhone()
                {
                    Client = client.Entity,
                    Phone = command.Phone
                });

            var workGroup = await _context.Set<WorkGroup>()
                .FirstOrDefaultAsync(x => x.EscortManagerId == currentManagerId
                                          || x.RegionalManagerId == currentManagerId);

            workGroup.BindClient(new BindClient()
            {
                ClientId = client.Entity.Id,
                WorkgroupId = workGroup.Id
            });

            await _context.SaveChangesAsync();

            var result = client.Entity;

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ClientEdit command)
        {
            var client = await _context.Set<Client>()
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            client.Edit(command);

            if (command.Phone != "")
            {
                var phone = await _context.Set<ClientPhone>()
                    .FirstOrDefaultAsync(x => x.ClientId == command.Id);

                phone.Phone = command.Phone;
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
                Phone = command.Phone,
                Title = client.Title
            };

            return Ok(result);
        }

    }
}