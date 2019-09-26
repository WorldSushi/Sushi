﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.DTO.Clients;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.Controler
{
    [Route("api/conroler/[controller]")]
    [ApiController]
    public class ClientAcceptController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IAccountInformationService _accountInformationService;

        public ClientAcceptController(ApplicationContext context,
            IAccountInformationService accountInformationService)
        {
            _context = context;
            _accountInformationService = accountInformationService;
        }

        public async Task<IActionResult> Get()
        {
            List<Call> calls = _context.Set<Call>().ToList();
            var result = await _context.Set<ClientContact>()
                //.Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => new AcceptCallsDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    ContactType = x.Type,
                    Date = x.Date.ToString("dd.MM.yyyy"),
                    ManagerType = x.ManagerType,
                    ManagerId = x.ManagerId,
                    Durations = calls.FirstOrDefault(c => c.ClientId == x.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == x.ClientId).Duration : 0,
                    ReferenceAudioVoice = calls.FirstOrDefault(c => c.ClientId == x.ClientId) != null ? calls.FirstOrDefault(c => c.ClientId == x.ClientId).Recording : "",
                    TitleClient = x.Client.LegalEntity,
                }).ToListAsync();
            return Ok(result);
        }
    }
}