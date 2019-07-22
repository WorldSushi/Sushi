using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.ClientContact;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.Commands.Manager;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Data.Entities.Users;
using Data.Enums;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMyCallsAPIService _myCallsApiService;
        private readonly ApplicationContext _context;

        public HomeController(IMyCallsAPIService myCallsApiService,
            ApplicationContext context)
        {
            _myCallsApiService = myCallsApiService;
            _context = context;
        }

        /*public void PhoneRegular()
        {
            var a = _context.Set<Client>();
            var b = new Dictionary<string, string>();

            string pattern = @"(\D[0-9]{3})-[0-9]{3}-[0-9]{2}-[0-9]{2}\D";
            
            foreach (var client in a)
            {
                if(Regex.IsMatch(client.Phone, pattern))
                    b.Add(client.Title, client.Phone);
            }
        }*/

        /*[HttpGet]
        public IActionResult ImportFile()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFile(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.UTF8.GetString(data);
            string[] lines = result.Split('\r');
            
            for (var i = 1; i < lines.Length; i++)
            {
                if (lines[i].Length > 2)
                {
                    lines[i] = lines[i].Substring(1);
                    string[] rows = lines[i].Split(';');

                    var manager = _context.Set<Manager>()
                        .Add(new Manager(
                            new ManagerCreateCommand()
                            {
                                Login = rows[0],
                                Password = "1234",
                                Phone = rows[2]
                            })).Entity;

                    var userInfo = _context.Set<UserInfo>()
                        .AddAsync(new UserInfo(manager, Guid.Parse(rows[1])));
                }
            }

            _context.SaveChanges();

            return RedirectToAction("ImportFile");
        }*/

        /*[HttpGet]
        public IActionResult ImportFileClients()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFileClients(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.UTF8.GetString(data);
            string[] lines = result.Split('\r');


            var userInfos = _context.Set<UserInfo>()
                .Where(x => x.UserId != 1 && x.UserId != 11)
                .ToList();

            for (var i = 1; i < lines.Length; i++)
            {
                if (lines[i].Length > 2)
                {
                    lines[i] = lines[i].Substring(1);
                    string[] rows = lines[i].Split(';');
                    
                    var client = _context.Set<Client>()
                        .Add(new Client(new ClientCreate()
                        {
                            ClientType = ClientTypes.Middle1,
                            Title = rows[0],
                            LegalEntity = rows[1],
                            NumberOfCalls = GetNumberOfCalls(rows[4]),
                            NumberOfShipments = GetNumberOfShipments(rows[5]),
                            Phone = rows[6]
                        })).Entity;

                    var clientInfo = _context.Set<ClientInfo>()
                        .Add(new ClientInfo(client, Guid.Parse(rows[9]), rows[6]));

                    //_context.SaveChanges();

                    if (rows[10] != "")
                    {
                        var managersGuidStr = rows[10].Split(',');
                        var managersGuid = new List<Guid>();
                        foreach (var str in managersGuidStr)
                        {
                            managersGuid.Add(Guid.Parse(str));
                        }

                        var userInfo = userInfos.FirstOrDefault(x => managersGuid.Contains(x.OneCId));

                        if (userInfo != null)
                        {
                            var workGroup = _context.Set<WorkGroup>()
                                .FirstOrDefault(x => x.RegionalManagerId == userInfo.UserId
                                                     || x.EscortManagerId == userInfo.UserId);

                            workGroup.BindClient(new BindClient()
                            {
                                Client = client,
                                WorkGroupId = workGroup.Id
                            });
                        }
                    }
                }
            }

            _context.SaveChanges();

            return RedirectToAction("ImportFileClients");
        }*/

        /* public void InitWorkGroup()
         {
             _context.Set<WorkGroup>()
                 .AddRange(
                     new WorkGroup(new WorkGroupCreate()
                     {
                         Title = "Северо-восток",
                         EscortManagerId = 3,
                         RegionalManagerId = 2
                     }),
                     new WorkGroup(new WorkGroupCreate()
                     {
                         Title = "Центр",
                         EscortManagerId = 5,
                         RegionalManagerId = 4
                     }),
                     new WorkGroup(new WorkGroupCreate()
                     {
                         Title = "Юго-запад",
                         EscortManagerId = 7,
                         RegionalManagerId = 6
                     }),
                     new WorkGroup(new WorkGroupCreate()
                     {
                         Title = "Ритейл",
                         EscortManagerId = 9,
                         RegionalManagerId = 8
                     }));

             _context.SaveChanges();
         }*/

        /* [HttpGet]
        public IActionResult ImportFileExportClients()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFileExportClients(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.UTF8.GetString(data);
            string[] lines = result.Split('\r');

            var a = new List<Client>();

            for (var i = 1; i < lines.Length; i++)
            {
                if (lines[i].Length > 2)
                {
                    lines[i] = lines[i].Substring(1);
                    string[] rows = lines[i].Split(';');

                    var client = _context.Set<Client>()
                        .FirstOrDefault(x => x.Title == rows[0]);

                    if (client != null)
                    {
                        var clientInfo = _context.Set<ClientInfo>()
                            .FirstOrDefault(x => x.ClientId == client.Id);
                        clientInfo.Phone = client.Phone;

                        client.Phone = rows[3];
                        a.Add(client);
                    }
                }
            }

            _context.SaveChanges();

            return RedirectToAction("ImportFileExportClients");
        }*/

        public void MyCallsTest()
        {
            //_myCallsApiService.SaveNewCalls();
            /*var a = _context.Set<CallInfo>()
                .Include(x => x.Call)
                .ToList();

            var b = new List<ClientContact>();

            var c = _context.Set<WorkGroup>().ToList();
            foreach (var callInfo in a)
            {
                b.Add(new ClientContact(
                    new ClientContactCreate()
                    {
                        ClientId = callInfo.Call.ClientId,
                        ContactType = ClientContactType.Call,
                        ManagerType = c.FirstOrDefault(x => x.EscortManagerId == callInfo.Call.ManagerId) != null
                            ? ManagerType.EscortManager
                            : c.FirstOrDefault(x => x.RegionalManagerId == callInfo.Call.ClientId) != null
                                ? ManagerType.RegionalManager
                                : ManagerType.Undefined,
                        ManagerId = callInfo.Call.ManagerId
                    }));
            }

            _context.Set<ClientContact>()
                .AddRange(b);

            _context.SaveChanges();*/
        }

        /*public void Test1()
        {
            var clients = _context.Set<Client>()
                .Where(x => x.Phone != "")
                .Select(x => new
                {
                    Id = x.Id,
                    Phone = x.Phone
                }).ToList();

            var clientPhones = new List<ClientPhone>();

            foreach (var client in clients)
            {
                var phones = client.Phone.Split(',');
                foreach (var phone in phones)
                {
                    string newPhone = Regex.Replace(phone, @"[^0-9$,]", "");

                    if (newPhone.Length == 10)
                    {
                        clientPhones.Add(new ClientPhone()
                        {
                            ClientId = client.Id,
                            Phone = newPhone
                        });
                    } else if (newPhone.Length == 11)
                    {
                        newPhone = newPhone.Substring(1);
                        clientPhones.Add(new ClientPhone()
                        {
                            ClientId = client.Id,
                            Phone = newPhone
                        });
                    }
                }
            }

            _context.Set<ClientPhone>()
                .AddRange(clientPhones);

            _context.SaveChanges();
        }*/

        /*public void Test2()
        {
            var a = _context.Set<CallLog>().Select(x => x.Id).ToList();
            var b = _context.Set<CallInfo>().Select(x => x.CallLogId).ToList();

            var callLogsId = a.Except(b).ToList();

            var dt = new DateTime(1970, 1, 1);

            var callInfos = new List<CallInfo>();
            var clientContacts = new List<ClientContact>();

            var workGroups = _context.Set<WorkGroup>().ToList();

            foreach (var callLogId in callLogsId)
            {
                var callLog = _context.Set<CallLog>().FirstOrDefault(x => x.Id == callLogId);

                if ((callLog.ClientNumber.Length > 2
                     && _context.Set<ClientPhone>().Any(x => x.Phone.Contains(callLog.ClientNumber.Substring(2))))
                    && (callLog.SrcNumber.Length > 2
                        && _context.Set<Manager>().Any(x => x.Phone.Contains(callLog.SrcNumber.Substring(2)))))
                {
                    var callInfo = new CallInfo()
                    {
                        Call = new Call()
                        {
                            ClientId = _context.Set<ClientPhone>()
                                .FirstOrDefault(x => x.Phone.Contains(callLog.ClientNumber.Substring(2))).ClientId,
                            DateTime = dt + TimeSpan.FromSeconds(callLog.StartTime),
                            Duration = callLog.Duration,
                            Recording = callLog.Recording,
                            ManagerId = _context.Set<Manager>()
                                .FirstOrDefault(x => x.Phone.Contains(callLog.SrcNumber.Substring(2))).Id
                        },
                        CallLogId = callLogId
                    };
                    callInfos.Add(callInfo);
                    clientContacts.Add(
                        new ClientContact(
                            new ClientContactCreate()
                            {
                                ClientId = callInfo.Call.ClientId,
                                ContactType = ClientContactType.Call,
                                ManagerId = callInfo.Call.ManagerId,
                                ManagerType =
                                    workGroups.FirstOrDefault(x => x.EscortManagerId == callInfo.Call.ManagerId) != null
                                        ? ManagerType.EscortManager
                                        : workGroups.FirstOrDefault(x =>
                                              x.RegionalManagerId == callInfo.Call.ManagerId) != null
                                            ? ManagerType.RegionalManager
                                            : ManagerType.Undefined
                            }));
                }
            }

            _context.Set<CallInfo>()
                .AddRange(callInfos);

            _context.Set<ClientContact>()
                .AddRange(clientContacts);

            _context.SaveChanges();
        }*/

        public void Test3()
        {
            var calls = _context.Set<CallInfo>()
                .Include(x => x.Call)
                .Include(x => x.CallLog)
                .ToList();

            var workGroups = _context.Set<WorkGroup>().ToList();

            var clientContacts = new List<ClientContact>();

            var dt = new DateTime(1970, 1, 1);

            foreach (var call in calls)
            {
                var clientContact = new ClientContact(
                    new ClientContactCreate()
                    {
                        ClientId = call.Call.ClientId,
                        ManagerId = call.Call.ManagerId,
                        ContactType = ClientContactType.Call,
                        ManagerType = workGroups.FirstOrDefault(x => x.EscortManagerId == call.Call.ManagerId) != null
                            ? ManagerType.EscortManager
                            : workGroups.FirstOrDefault(x => x.RegionalManagerId == call.Call.ManagerId) != null
                                ? ManagerType.RegionalManager
                                : ManagerType.Undefined
                    });
                clientContact.Date = dt + TimeSpan.FromSeconds(call.CallLog.StartTime);
                
                clientContacts.Add(clientContact);
            }

            _context.Set<ClientContact>()
                .AddRange(clientContacts);

            _context.SaveChanges();
        }

        public IActionResult Index()
        {
            return Redirect("/Account/Index");
        }

        private NumberOfCalls GetNumberOfCalls(string numberStr)
        {
            if (numberStr == "")
                return NumberOfCalls.WithoutType;

            var number = float.Parse(numberStr);

            if (number <= 0)
                return NumberOfCalls.WithoutType;
            if (number > 0 && number < 2)
                return NumberOfCalls.OnePerMonth;
            if (number >= 2 && number < 3)
                return NumberOfCalls.OnePerTwoWeek;
            if (number >= 3 && number < 4)
                return NumberOfCalls.ThreePerMonth;
            if (number >= 4 && number < 5)
                return NumberOfCalls.OnePerWeek;
            if (number >= 5 && number < 6)
                return NumberOfCalls.FivePerMonth;
            if (number >= 6 && number < 8)
                return NumberOfCalls.SixPerMonth;
            if (number >= 8)
                return NumberOfCalls.TwoPerWeek;

            return NumberOfCalls.WithoutType;
        }

        private NumberOfShipments GetNumberOfShipments(string numberStr)
        {
            if (numberStr == "")
                return NumberOfShipments.WithoutType;

            var number = float.Parse(numberStr);

            if (number <= 0)
                return NumberOfShipments.WithoutType;
            if (number > 0 && number < 2)
                return NumberOfShipments.OnePerMonth;
            if (number >= 2 && number < 3)
                return NumberOfShipments.OnePerTwoWeek;
            if (number >= 3 && number < 4)
                return NumberOfShipments.ThreePerMonth;
            if (number >= 4 && number < 5)
                return NumberOfShipments.OnePerWeek;
            if (number >= 5 && number < 6)
                return NumberOfShipments.FivePerMonth;
            if (number >= 6 && number < 8)
                return NumberOfShipments.SixPerMonth;
            if (number >= 8)
                return NumberOfShipments.TwoPerWeek;

            return NumberOfShipments.WithoutType;
        }
    }
}