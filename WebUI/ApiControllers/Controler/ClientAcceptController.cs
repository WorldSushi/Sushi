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
using EnumsNET;
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
            List<Data.Entities.Users.Manager> managers = _context.Set<Data.Entities.Users.Manager>().ToList();
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
                    Durations = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallClient)calls.FirstOrDefault(c => c.Id == x.CallId)).Duration : 0,
                    ReferenceAudioVoice = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallClient)calls.FirstOrDefault(c => c.Id == x.CallId)).Recording : "",
                    TitleClient = clients.FirstOrDefault(c => c.Id == x.ClientId) != null ? clients.FirstOrDefault(c => c.Id == x.ClientId).LegalEntity : "",
                    Phone = clientPhones.FirstOrDefault(c => c.ClientId == x.ClientId) != null ? clientPhones.FirstOrDefault(c => c.ClientId == x.ClientId).Phone : "",
                    Direction = x.Direction == "0" ? "Входящий" : x.Direction == "1" ? "Исходящий" : "Неизвестно",
                    CallsComments = callsComments.FirstOrDefault(c => c.ClientId == x.ClientId && c.ContactClientId == x.Id && c.Type == "Звонок")
                }).ToListAsync();
            result.AddRange(_context.Set<ContactManager>()
                //.Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => new AcceptCallsDto()
                {
                    Id = x.Id,
                    ClientId = (int)x.ManagerIdC,
                    ContactType = x.Type,
                    Date = x.Date.ToString("dd.MM.yyyy hh:mm:ss"),
                    ManagerType = x.ManagerType,
                    ManagerId = x.ManagerId,
                    Durations = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallManager)calls.FirstOrDefault(c => c.Id == x.CallId)).Duration : 0,
                    ReferenceAudioVoice = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallManager)calls.FirstOrDefault(c => c.Id == x.CallId)).Recording : "",
                    TitleClient = managers.FirstOrDefault(m => m.Id == x.ManagerIdC) != null ? managers.FirstOrDefault(m => m.Id == x.ManagerIdC).Login : "",
                    Phone = managers.FirstOrDefault(m => m.Id == x.ManagerIdC) != null ? managers.FirstOrDefault(m => m.Id == x.ManagerIdC).Phone : "",
                    Direction = x.Direction == "0" ? "Входящий" : x.Direction == "1" ? "Исходящий" : "Неизвестно"
                }).ToList());
            return Ok(result);
        }

        [HttpGet]
        [Route("Clients")]
        public async Task<IActionResult> GetClients()
        {
            List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();
            var result = await _context.Set<Client>()
                .Select(x => new 
                {
                    Id = x.Id,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    Phones = clientPhones.Where(z => z.ClientId == x.Id).Select(z => new ClientPhoneDTO
                    {
                        Id = z.Id,
                        Phone = z.Phone
                    }).ToList(),
                    ClientType = x.ClientType.AsString(EnumFormat.Description),
                    NumberOfCalls = x.NumberOfCalls.AsString(EnumFormat.Description),
                    Group = (int)x.Group,
                    NumberOfShipments = x.NumberOfShipments.AsString(EnumFormat.Description),
                    HasWorkgroup = _context.Set<ClientWorkGroup>().Any(z => z.ClientId == x.Id),
                    ContactName = _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.Id) != null ? _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.Id).Name : "",
                    CallsComments = callsComments.FirstOrDefault(c => c.ClientId == x.Id && c.Type == "Клиент")
                }).ToListAsync();

            return Ok(result);
        }



        [HttpGet]
        [Route("NoAcceptCallClient")]
        public void NoAcceptCallClient(string comment, string clientId)
        {
            string color = null;
            if (_accountInformationService.CurrentUser() is Data.Entities.Users.Manager)
            {
                color = ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "1" ? "black" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "2" ? "lightskyblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "3" ? "blue" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "4" ? "blueviolet"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "5" ? "brown" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "6" ? "chocolate"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "7" ? "coral" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "8" ? "darkblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "9" ? "deeppink" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "10" ? "gold"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "11" ? "green" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "12" ? "tomato"
                : "black";
            }
            else
            {
                color = "black";
            }
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.Type == "Клиент");
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept;
                callsComment.ColorPen = color;
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ColorPen = color,
                    Type = "Клиент"
                }); ;
            }
            _context.SaveChanges();
        }


        [HttpGet]
        [Route("DefaultCallClient")]
        public void DefaultCallClient(string comment, string clientId)
        {
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.Type == "Клиент");
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.Default;

            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.Default,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    Type = "Клиент"
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("NoAcceptCall")]
        public void NoAcceptCall(string comment, string callId, string clientId)
        {
            string color = null;
            if(_accountInformationService.CurrentUser() is Data.Entities.Users.Manager)
            {
                color = ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "1" ? "black" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "2" ? "lightskyblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "3" ? "blue" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "4" ? "blueviolet"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "5" ? "brown" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "6" ? "chocolate"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "7" ? "coral" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "8" ? "darkblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "9" ? "deeppink" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "10" ? "gold"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "11" ? "green" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "12" ? "tomato"
                : "black";
            }
            else
            {
                color = "black";
            }
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.ContactClientId.ToString() == callId && c.Type == "Звонок");
            if(callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept;
                callsComment.ColorPen = color;
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ContactClientId  = Convert.ToInt32(callId),
                    ColorPen = color,
                    Type = "Звонок"
                });;
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("DefaultCall")]
        public void DefaultCall(string comment, string callId, string clientId)
        {
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.ContactClientId.ToString() == callId && c.Type == "Звонок");
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.Default;
               
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.Default,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ContactClientId = Convert.ToInt32(callId),
                    Type = "Звонок"
                });
            }
            _context.SaveChanges();
        }
    }
}