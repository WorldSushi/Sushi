﻿using System.Linq;
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
            var result = await _context.Set<Client>()
                .Select(x => new ClientDto()
                {
                    Id = x.Id,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    //Phone = x.Phone,
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

            await _context.SaveChangesAsync();

            var result = new ClientDto()
            {
                Id = client.Entity.Id,
                Title = client.Entity.Title,
                LegalEntity = client.Entity.LegalEntity,
                Phone = client.Entity.Phone,
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

            await _context.SaveChangesAsync();

            var result = new ClientDto()
            {
                Id = client.Id,
                Title = client.Title,
                LegalEntity = client.LegalEntity,
                Phone = client.Phone,
                ClientType = client.ClientType,
                NumberOfCalls = client.NumberOfCalls,
                NumberOfShipments = client.NumberOfShipments,
                HasWorkgroup = _context.Set<ClientWorkGroup>().Any(x => x.ClientId == client.Id)
            };

            return Ok(result);
        }
    }
}