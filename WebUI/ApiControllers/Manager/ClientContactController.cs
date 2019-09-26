﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.ClientContact;
using Data.DTO.Clients;
using Data.Entities.Calls;
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
    public class ClientContactController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IAccountInformationService _accountInformationService;

        public ClientContactController(ApplicationContext context,
            IAccountInformationService accountInformationService)
        {
            _context = context;
            _accountInformationService = accountInformationService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Call> calls = _context.Set<Call>().ToList();
            var result = await _context.Set<ClientContact>() 
                //.Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => new ClientContactDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    ContactType = x.Type,
                    Date = x.Date.ToString("dd.MM.yyyy"),
                    ManagerType = x.ManagerType,
                    ManagerId = x.ManagerId,
                    Durations = calls.FirstOrDefault(c => c.ClientId == x.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == x.ClientId).Duration : 0,
                    //IsAccept = x.IsAccept
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
            {
                clientContact.Type = command.ContactType;
                await _context.SaveChangesAsync();
                return Ok(null);
            }

            /*command.ManagerId = _context.Set<ManagerForClient>()
                .FirstOrDefault(x => x.ClientId == command.ClientId && x.Type == command.ManagerType)
                .Id;*/

            var workGroup = await _context.Set<ClientWorkGroup>()
                .Where(x => x.ClientId == command.ClientId)
                .Select(x => new
                {
                    RegionalManagerId = x.WorkGroup.RegionalManagerId,
                    EscortManagerId = x.WorkGroup.EscortManagerId
                }).FirstOrDefaultAsync();

            if (command.ManagerType == ManagerType.EscortManager)
                command.ManagerId = (int)workGroup.EscortManagerId;
            else if (command.ManagerType == ManagerType.RegionalManager)
                command.ManagerId = (int) workGroup.RegionalManagerId;
            else
                return BadRequest("Не указана роль менеджера");

            var newClientContact = await _context.Set<ClientContact>()
                .AddAsync(new ClientContact(command));

            await _context.SaveChangesAsync();

            var result = new ClientContactDto()
            {
                Id = newClientContact.Entity.Id,
                ClientId = newClientContact.Entity.ClientId,
                ContactType = newClientContact.Entity.Type,
                Date = newClientContact.Entity.Date.ToString("dd.MM.yyyy"),
                ManagerType = newClientContact.Entity.ManagerType
            };

            return Ok(result);
        } 

        private int GetAccount()
        {
            var response = new
            {
                Id = _accountInformationService.CurrentUser().Id,
                Login = _accountInformationService.CurrentUser().Login,
                Role = _accountInformationService.CurrentUser() is Data.Entities.Users.Admin
                    ? "Admin"
                    : "Manager",
                Workgroup = _accountInformationService.CurrentUser() is Data.Entities.Users.Admin
                    ? null
                    : _context.Set<WorkGroup>()
                        .FirstOrDefault(x => x.EscortManagerId == _accountInformationService.GetOperatorId() || x.RegionalManagerId == _accountInformationService.GetOperatorId())
            };
            return response.Id;
        }
    }
}