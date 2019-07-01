using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.ClientContacts.ClientContact;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientContactController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ClientContactController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Set<ClientContact>()
                .Select(x => new ClientContactDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    ContactType = x.Type,
                    Date = x.Date,
                    ManagerType = x.ManagerType
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClientContactCreate command)
        {
            var clientContact = await _context.Set<ClientContact>()
                .FirstOrDefaultAsync(x => x.ClientId == command.ClientId
                                          && x.ManagerType == command.ManagerType
                                          && x.Date.Date == DateTime.Now.Date.Date);

            if (clientContact != null)
                return BadRequest("Операция на этот день уже создана");

            var newClientContact = await _context.Set<ClientContact>()
                .AddAsync(new ClientContact(command));

            await _context.SaveChangesAsync();

            var result = newClientContact.Entity;

            return Ok(result);
        } 
    }
}