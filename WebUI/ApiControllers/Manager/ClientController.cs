using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Enums;
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

        public ClientController(ApplicationContext context,
            IAccountInformationService accountInformationService)
        {
            _context = context;
            _accountInformationService = accountInformationService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var managerId = _accountInformationService.GetOperatorId();

            var workGroup = await _context.Set<WorkGroup>()
                .FirstOrDefaultAsync(x => x.RegionalManagerId == managerId
                                          || x.EscortManagerId == managerId);

            var result = await _context.Set<ClientWorkGroup>()
                .Where(x => x.WorkGroupId == workGroup.Id)
                .Select(x => new ClientDto()
                {
                    Id = x.Client.Id,
                    Title = x.Client.Title,
                    LegalEntity = x.Client.LegalEntity,
                    Phone = "555-35-35",
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

            await _context.SaveChangesAsync();

            var result = client;

            return Ok(result);
        }

    }
}