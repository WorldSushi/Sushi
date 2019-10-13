using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.DTO.Clients;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Enums;
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
            List<Call> calls = _context.Set<Call>().ToList();
            List<ClientPhone> clientPhones = _context.Set<ClientPhone>().ToList();
            List<Client> clients = _context.Set<Client>().ToList();
            var result = await _context.Set<ClientContact>()
                //.Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => new AcceptCallsDto()
                {
                    Id = x.Id,
                    ClientId = (int)x.ClientId,
                    ContactType = x.Type,
                    Date = x.Date.ToString("dd.MM.yyyy hh:mm:ss"),
                    ManagerType = x.ManagerType,
                    ManagerId = x.ManagerId,
                    Durations = calls.FirstOrDefault(c => c.Id == x.Call.Id) != null ? calls.FirstOrDefault(c => c.Id == x.Call.Id).Duration : 0,
                    ReferenceAudioVoice = calls.FirstOrDefault(c => c.Id == x.Call.Id) != null ? calls.FirstOrDefault(c => c.Id == x.Call.Id).Recording : "",
                    TitleClient = clients.FirstOrDefault(c => c.Id == x.ClientId) != null ? clients.FirstOrDefault(c => c.Id == x.ClientId).LegalEntity : "",
                    Phone = clientPhones.FirstOrDefault(c => c.ClientId == x.ClientId) != null ? clientPhones.FirstOrDefault(c => c.ClientId == x.ClientId).Phone : "",
                    Direction = x.Direction == "0" ? "Входящий" : x.Direction == "1" ? "Исходящий" : "Неизвестно",
                    CallsComments = callsComments.FirstOrDefault(c => c.ClientId == x.ClientId && c.ContactClientId == x.Id)
                }).ToListAsync();
            return Ok(result);
        }

        [HttpGet]
        [Route("NoAcceptCall")]
        public void NoAcceptCall(string comment, string callId, string clientId)
        {
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.ContactClientId.ToString() == callId);
            if(callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept;
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ContactClientId  = Convert.ToInt32(callId)
                });;
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("DefaultCall")]
        public void DefaultCall(string comment, string callId, string clientId)
        {
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.ContactClientId.ToString() == callId);
            if (callsComment != null)
            {
                callsComment.Comment = "";
                callsComment.AcceptControlerCalss = AcceptControlerCalss.Default;
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.Default,
                    Comment = "",
                    ClientId = Convert.ToInt32(clientId),
                    ContactClientId = Convert.ToInt32(callId)
                }); ;
            }
            _context.SaveChanges();
        }
    }
}