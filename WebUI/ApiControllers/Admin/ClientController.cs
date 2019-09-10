using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.Clients;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
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
                    Phones = clientPhones.Where(z => z.ClientId == x.Id).Select(z => new ClientPhoneDTO
                    {
                        Id = z.Id,
                        Phone = z.Phone
                    }).ToList(),
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    Group = (int)x.Group,
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

            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();

            var result = new ClientDto()
            {
                Id = client.Entity.Id,
                Title = client.Entity.Title,
                LegalEntity = client.Entity.LegalEntity,
                Phones = clientPhones.Where(z => z.ClientId == client.Entity.Id).Select(z => new ClientPhoneDTO {
                    Id = z.Id,
                    ClientId = client.Entity.Id,
                    Phone = z.Phone
                }).ToList(),
                ClientType = client.Entity.ClientType,
                NumberOfCalls = client.Entity.NumberOfCalls,
                NumberOfShipments = client.Entity.NumberOfShipments,
                HasWorkgroup = _context.Set<ClientWorkGroup>().Any(x => x.ClientId == client.Entity.Id),
                Group = (int)client.Entity.Group
            };

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ClientEdit command)
        {
            var client = await _context.Set<Client>()
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            client.Edit(command);

            foreach(var phone in command.Phones)
            {
                if (phone.Deleted == true && phone.Id > 0)
                {
                    var deletingPhone = _context.Set<ClientPhone>().FirstOrDefault(x => x.Id == phone.Id);

                    _context.Set<ClientPhone>().Remove(deletingPhone);
                }
                else if(phone.Id > 0 && phone.Deleted == false)
                {
                    var editingPhone = _context.Set<ClientPhone>().FirstOrDefault(x => x.Id == phone.Id);

                    editingPhone.Phone = phone.Phone;

                    _context.Update(editingPhone);                  
                }
                else if(phone.Id == 0 && phone.Deleted == false)
                {
                    await _context.Set<ClientPhone>().AddAsync(new ClientPhone
                    {
                        Phone = phone.Phone,
                        ClientId = phone.ClientId
                    });
                }
               
            }


            await _context.SaveChangesAsync();

            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();

            var result = new ClientDto()
            {
                Id = client.Id,
                Title = client.Title,
                LegalEntity = client.LegalEntity,
                Phones = clientPhones.Where(z => z.ClientId == client.Id).Select(z => new ClientPhoneDTO
                {
                    Id = z.Id,
                    Phone = z.Phone
                }).ToList(),
                ClientType = client.ClientType,
                NumberOfCalls = client.NumberOfCalls,
                NumberOfShipments = client.NumberOfShipments,
                Group = (int)client.Group,
                HasWorkgroup = _context.Set<ClientWorkGroup>().Any(x => x.ClientId == client.Id)
            };

            return Ok(result);
        }
    }
}