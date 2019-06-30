using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.Clients;
using Data.DTO.Clients;
using Data.Entities.Clients;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
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
            var result = await _context.Set<Client>()
                .Select(x => new ClientDto()
                {
                    Id = x.Id,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    Phone = x.Phone,
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    NumberOfShipments = x.NumberOfShipments
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientCreate command)
        {
            var client = await _context.Set<Client>()
                .AddAsync(new Client(command));

            await _context.SaveChangesAsync();

            var result = client.Entity;

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put(int id, [FromBody] ClientEdit command)
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