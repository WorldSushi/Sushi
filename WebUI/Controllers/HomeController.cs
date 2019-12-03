using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Data;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Data.Entities.Users;
using Data.Enums;
using Data.Services.Abstract;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        [Route("Init")]
        public void Init(string id)
        {
            //_context.Set<ClientInfo>().Remove(_context.Set<ClientInfo>().FirstOrDefault(c => c.ClientId.ToString() == id));
            //_context.Set<Client>().Remove(_context.Set<Client>().FirstOrDefault(c => c.Id.ToString() == id));
            //_context.SaveChanges();
        }

        [HttpGet]
        public IActionResult ImportFileClients()
        {
            var userInfos = _context.Set<Data.Entities.OneCInfo.UserInfo>()
                  .Where(x => x.UserId != 1 && x.UserId != 11)
                  .ToList();
            List<ClientInfo> clientInfos = _context.Set<ClientInfo>().ToList(); 
            List<Client> clients = _context.Set<Client>().ToList();

            var clientPhones = new List<ClientPhone>();
            using (SpreadsheetDocument spreadSheet = SpreadsheetDocument.Open($"R.xlsx", true))
            {
                SharedStringTable sharedStringTable = spreadSheet.WorkbookPart.SharedStringTablePart.SharedStringTable;
                foreach (WorksheetPart worksheetPart in spreadSheet.WorkbookPart.WorksheetParts)
                {
                    foreach (SheetData sheetData in worksheetPart.Worksheet.Elements<SheetData>())
                    {
                        if (sheetData.HasChildren)
                        {
                            string table = null;
                            foreach (Row row in sheetData.Elements<Row>())
                            {
                                if (row.ToList().Count > 7)
                                {
                                    try
                                    {
                                        string tmp = null;
                                        var Cells = row.Elements<Cell>().ToList();
                                        if (table == "!Наименование")
                                        {
                                            var client = _context.Set<Client>()
                                                .Add(new Client(new ClientCreate()
                                                {
                                                    ClientType = ClientTypes.Middle1,
                                                    Title = GetData(Cells[0], sharedStringTable),
                                                    LegalEntity = GetData(Cells[1], sharedStringTable),
                                                    NumberOfCalls = GetNumberOfCalls(GetData(Cells[4], sharedStringTable)),
                                                    NumberOfShipments = GetNumberOfShipments(GetData(Cells[5], sharedStringTable))
                                                })).Entity;
                                            if (GetData(Cells[8], sharedStringTable) != "")
                                            {
                                                var e = GetData(Cells[8], sharedStringTable).Split(',');
                                                foreach (var phone in e)
                                                {
                                                    string newPhone = Regex.Replace(phone, @"[^0-9]", "");

                                                    if (newPhone.Length == 10)
                                                    {
                                                        clientPhones.Add(new ClientPhone()
                                                        {
                                                            Client = client,
                                                            Phone = newPhone
                                                        });
                                                    }
                                                    else if (newPhone.Length == 11)
                                                    {
                                                        newPhone = newPhone.Substring(1);
                                                        clientPhones.Add(new ClientPhone()
                                                        {
                                                            Client = client,
                                                            Phone = newPhone
                                                        });
                                                    }
                                                }
                                            }
                                            var clientInfo = _context.Set<ClientInfo>()
                                                .Add(new ClientInfo(client.Id, Guid.Parse(GetData(Cells[10], sharedStringTable)), GetData(Cells[8], sharedStringTable)));
                                            _context.SaveChanges();

                                            if (GetData(Cells[11], sharedStringTable) != "")
                                            {
                                                var managersGuidStr = GetData(Cells[11], sharedStringTable).Split(',');
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
                                                        ClientId = client.Id,
                                                        WorkgroupId = workGroup.Id
                                                    });
                                                }
                                            }
                                            continue;
                                        }
                                        else if(table == "Контрагент")
                                        {
                                            ContactName contactName = new ContactName();
                                            ClientInfo clientInfo = clientInfos.FirstOrDefault(c => c.OneCId.ToString() == GetData(Cells[1], sharedStringTable));
                                            if(clientInfo != null)
                                            {
                                                Client client = clients.FirstOrDefault(c => c.Id == clientInfo.ClientId);
                                                contactName.ClientId = client.Id;
                                                contactName.Name = GetData(Cells[2], sharedStringTable);
                                                contactName.Position = GetData(Cells[3], sharedStringTable);
                                                contactName.ContactRole = GetData(Cells[4], sharedStringTable);
                                                contactName.Type = GetData(Cells[5], sharedStringTable);
                                                var s = _context.Set<ContactName>().Add(new ContactName()
                                                {
                                                    ClientId = client.Id,
                                                    ContactRole = GetData(Cells[4], sharedStringTable),
                                                    Name = GetData(Cells[2], sharedStringTable),
                                                    Position = GetData(Cells[3], sharedStringTable),
                                                    Type = GetData(Cells[5], sharedStringTable)
                                                });
                                                _context.SaveChanges();
                                            }
                                            continue;
                                        }
                                        table = GetData(Cells[0], sharedStringTable);
                                    }
                                    catch (Exception e)
                                    {

                                    }
                                }
                            }
                        }
                    }
                }
                spreadSheet.Close();
            }
             return View();
        }

        private string GetData(Cell cell, SharedStringTable sharedStringTable)
        {
            string data = null;
            if (cell.DataType != null)
            {
                if (cell.DataType == CellValues.SharedString)
                {
                    data = sharedStringTable.ElementAt(Int32.Parse(cell.InnerText)).InnerText;
                }
                else
                {
                    data = cell.InnerText;
                }
            }
            else
            {
                data = cell.InnerText;
            }
            return data;
        }

        [HttpPost]
        public IActionResult ImportFileClients(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.Default.GetString(data);
            string[] lines = result.Split('\r');


            var userInfos = _context.Set<Data.Entities.OneCInfo.UserInfo>()
                .Where(x => x.UserId != 1 && x.UserId != 11)
                .ToList();

            var clientPhones = new List<ClientPhone>();

            for (var i = 1; i < lines.Length; i++)
            {
                if (lines[i].Length > 2)
                {
                    lines[i] = lines[i].Substring(1);
                    string[] rows = lines[i].Split(';');

                    var d = rows[6];

                    var g = 0;                    

                    var client = _context.Set<Client>()
                        .Add(new Client(new ClientCreate()
                        {
                            ClientType = ClientTypes.Middle1,
                            Title = rows[0],
                            LegalEntity = rows[1],
                            NumberOfCalls = GetNumberOfCalls(rows[4]),
                            NumberOfShipments = GetNumberOfShipments(rows[5])
                        })).Entity;

                    if (rows[10] != "")
                    {
                        var e = rows[10].Split(',');
                        foreach (var phone in e)
                        {
                            string newPhone = Regex.Replace(phone, @"[^0-9]", "");
                            
                            if (newPhone.Length == 10)
                            {
                                clientPhones.Add(new ClientPhone()
                                {
                                    Client = client,
                                    Phone = newPhone
                                });
                            }
                            else if (newPhone.Length == 11)
                            {
                                newPhone = newPhone.Substring(1);
                                clientPhones.Add(new ClientPhone()
                                {
                                    Client = client,
                                    Phone = newPhone
                                });
                            }
                        }
                    }

                    //Guid c;

                    //if (!Guid.TryParse(rows[9 + g], out c))
                    //    a.Add(rows[0]);

                    var clientInfo = _context.Set<ClientInfo>()
                        .Add(new ClientInfo(client.Id, Guid.Parse(rows[8]), rows[10]));

                    _context.SaveChanges();

                    if (rows[9] != "")
                    {
                        var managersGuidStr = rows[9].Split(',');
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
                                ClientId = client.Id,
                                WorkgroupId = workGroup.Id
                            });
                        }
                    }
                }
            }

            _context.Set<ClientPhone>().AddRange(clientPhones);

            _context.SaveChanges();

            return RedirectToAction("ImportFileClients");
        }

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

        /*[HttpGet]
        public IActionResult ImportFileRevune()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFileRevune(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.UTF8.GetString(data);
            string[] lines = result.Split('\r');

            var clients = _context.Set<Client>()
                .Select(x => new
                {
                    Id = x.Id,
                    Name = x.Title
                }).ToList();

            var clientsRevenue = new List<ClientRevenue>(); 

            for (var i = 14; i < lines.Length; i++)
            {
                if (lines[i].Length > 2)
                {
                    lines[i] = lines[i].Substring(1);
                    string[] rows = lines[i].Split(';');

                    if (clients.Select(x => x.Name).Any(x => x == rows[0]))
                    {
                        var clientId = clients.FirstOrDefault(x => x.Name == rows[0]).Id;

                        if (rows[1].Length > 0)
                            clientsRevenue.Add(new ClientRevenue()
                            {
                                ClientId = clientId,
                                Revenue = Convert.ToDecimal(rows[1]),
                                Date = new DateTime(2019, 2, 1)
                            });

                        for (var k = 1; k <= 6; k++)
                            if (rows[k].Length > 0)
                                clientsRevenue.Add(new ClientRevenue()
                                {
                                    ClientId = clientId,
                                    Revenue = Convert.ToDecimal(rows[k]),
                                    Date = new DateTime(2019, k + 1, 1)
                                });
                    }
                }
            }

            _context.Set<ClientRevenue>()
                .AddRange(clientsRevenue);

            _context.SaveChanges();

            return RedirectToAction("ImportFileRevune");
        }*/

        public void MyCallsTest()
        {
            //_myCallsApiService.SaveNewCalls();


            /*var a = _context.Set<CallInfo>()
                .Select(x => x.CallLogId)
                .ToList();

            var c = _context.Set<Client>()
                .Select(x => x.Title)
                .ToList();

            var b = _context.Set<CallLog>()
                .Where(x => !a.Contains(x.Id) && c.Contains(x.ClientName))
                .ToList();*/



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

        /*public void Test3()
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
        }*/

        /*public void Test4()
        {
            var a = new Dictionary<int, string>()
            {
                {2, "6"},
                {3, "16"},
                {4, "3"},
                {5, "4"},
                {6, "8"},
                {7, "14"},
                {8, "15"},
                {9, "17"},
                {10, "5"}
            };

            var b = _context.Set<ClientPhone>()
                .Select(x => new
                {
                    ClientId = x.ClientId,
                    Phone = PhoneHelper.ConvertToPhone(x.Phone)
                });

            var c = _context.Set<CallInfo>().Select(x => x.CallLogId).ToList();

            var d = _context.Set<CallLog>()
                .Where(x => !c.Contains(x.Id)
                            && b.Select(z => z.Phone).Contains(PhoneHelper.ConvertToPhone(x.ClientNumber))
                            && a.Select(z => z.Value).Contains(x.UserId))
                .ToList();

            var workGroups = _context.Set<WorkGroup>().ToList();

            var callsInfo = new List<CallInfo>();
            var clientContacts = new List<ClientContact>();
            var dt = new DateTime(1970, 1, 1);

            foreach (var callLog in d)
            {
                callsInfo.Add(new CallInfo()
                {
                    Call = new Call()
                    {
                        ClientId = b
                            .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(callLog.ClientNumber)))
                            .ClientId,
                        ManagerId = a.FirstOrDefault(x => x.Value == callLog.UserId).Key,
                        Duration = callLog.Duration,
                        Recording = callLog.Recording,
                        DateTime = dt + TimeSpan.FromSeconds(callLog.StartTime)
                    },
                    CallLog = callLog
                });

                clientContacts.Add(new ClientContact(
                    new ClientContactCreate()
                    {
                        ClientId = b
                            .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(callLog.ClientNumber)))
                            .ClientId,
                        ContactType = ClientContactType.Call,
                        ManagerId = a.FirstOrDefault(x => x.Value == callLog.UserId).Key,
                        ManagerType = workGroups.FirstOrDefault(x =>
                                          x.EscortManagerId == a.FirstOrDefault(z =>
                                              z.Value == callLog.UserId).Key) != null
                            ? ManagerType.EscortManager
                            : workGroups.FirstOrDefault(x =>
                                  x.RegionalManagerId == a.FirstOrDefault(z =>
                                      z.Value == callLog.UserId).Key) != null
                                ? ManagerType.RegionalManager
                                : ManagerType.Undefined
                    }));

            }

            _context.Set<CallInfo>().AddRange(callsInfo);
            _context.Set<ClientContact>().AddRange(clientContacts);

            _context.SaveChanges();
        }*/

        public void Test5()
        {
            var a = _context.Set<CallLog>().ToList().Count;
        }
        
        public IActionResult Index()
        {
            return Redirect("/Account/Index");
        }

        private NumberOfCalls GetNumberOfCalls(string numberStr)
        {
            if (numberStr == "" || numberStr == null)
                return NumberOfCalls.WithoutType;

            var number = float.Parse(numberStr.Replace('.', ','));

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
            if (numberStr == "" || numberStr == null)
                return NumberOfShipments.WithoutType;

            var number = float.Parse(numberStr.Replace('.', ','));

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