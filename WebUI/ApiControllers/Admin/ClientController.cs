using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.Clients;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ClientController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();

            var result = await _context.Set<Client>()
                .Select(x => new ClientDto()
                {
                    Id = x.Id,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    Phone = clientPhones.Any(z => z.ClientId == x.Id)
                        ? clientPhones.FirstOrDefault(z => z.ClientId == x.Id).Phone
                        : "",
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    NumberOfShipments = x.NumberOfShipments,
                    HasWorkgroup = _context.Set<ClientWorkGroup>().Any(z => z.ClientId == x.Id)
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientCreate command)
        {
            var client = await _context.Set<Client>()
                .AddAsync(new Client(command));

            var clientPhone = await _context.Set<ClientPhone>()
                .AddAsync(new ClientPhone()
                {
                    Client = client.Entity,
                    Phone = command.Phone
                });

            await _context.SaveChangesAsync();

            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();

            var result = new ClientDto()
            {
                Id = client.Entity.Id,
                Title = client.Entity.Title,
                LegalEntity = client.Entity.LegalEntity,
                Phone = clientPhones.FirstOrDefault(z => z.ClientId == client.Entity.Id)?.Phone ?? "",
                ClientType = client.Entity.ClientType,
                NumberOfCalls = client.Entity.NumberOfCalls,
                NumberOfShipments = client.Entity.NumberOfShipments,
                HasWorkgroup = _context.Set<ClientWorkGroup>().Any(x => x.ClientId == client.Entity.Id)
            };

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

            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();

            var result = new ClientDto()
            {
                Id = client.Id,
                Title = client.Title,
                LegalEntity = client.LegalEntity,
                Phone = clientPhones.FirstOrDefault(z => z.ClientId == client.Id)?.Phone ?? "",
                ClientType = client.ClientType,
                NumberOfCalls = client.NumberOfCalls,
                NumberOfShipments = client.NumberOfShipments,
                HasWorkgroup = _context.Set<ClientWorkGroup>().Any(x => x.ClientId == client.Id)
            };

            return Ok(result);
        }
    }
}