using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.ClientContact;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.DTO.Clients;
using Data.DTO.OneC;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Data.Entities.Users;
using Data.Enums;
using Data.Services.Abstract;
using Data.Services.Concrete;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace WebUI.Controllers
{
    public class OneCController : ControllerBase
    {
        private ApplicationContext _context;
        private HttpWebRequest request = null;
        private IMyCallsAPIService _myCallsApiService;
        private IMyCallsAPIServiceAstrics _myCallsAPIServiceAstrics;

        public OneCController(ApplicationContext context)
        {
            _context = context;
        }

        //http://hanasyo.ru/api.OneC?updatetable=clients&id=34456

        [HttpGet]
        [Route("api.OneC/Resume")]
        public ResponseOneCDto GetClientResumeWeek(string idClient, string year, string monthe)
        {

            ResponseOneCDto responseOneC = new ResponseOneCDto();

            List<ClientResumeWeekDto> clientResumeWeeks = _context.Set<ClientResumeWeek>().Where(c => c.Resume != null && c.Resume != "")
                .Select(x => new ClientResumeWeekDto()
                {
                    ClientId = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == idClient).OneCId.ToString(),
                    Date = x.Date,
                    Resume = x.Resume
                }).ToList();
            if (idClient != null && idClient != "")
            {
                clientResumeWeeks = clientResumeWeeks.Where(c => c.ClientId.ToString() == idClient).ToList();
            }
            int yearNumber;
            int monthNumber;
            if (int.TryParse(year, out yearNumber) && int.TryParse(monthe, out monthNumber))
            {
                clientResumeWeeks = clientResumeWeeks.Where(c => DateTime.Parse(c.Date).Year == yearNumber && DateTime.Parse(c.Date).Month == monthNumber).ToList();
            }
            responseOneC.Result = clientResumeWeeks;
            responseOneC.Command = "GetResume";
            responseOneC.Status = "OK";
            return responseOneC;
        }


        //"CRM_Contragents" api.OneC
        [HttpGet]
        [Route("api.OneC")]
        public ResponseOneCDto GetClientResumeWeek(string updatetable, string id)
        {
            ResponseOneCDto responseOneC = new ResponseOneCDto();
            try
            {
                if ((updatetable != null && updatetable != "") && (id != null && id != ""))
                {
                    if (updatetable == "CRM_Contragents")
                    {
                        ReloadClients(id);
                    }
                    responseOneC.Description = "OK";
                }
                else
                {
                    responseOneC.Description = "Parameters are not valid";
                }
                responseOneC.Status = "OK";
            }
            catch (Exception e)
            {
                responseOneC.Status = e.Message;
            }
            return responseOneC;
        }

        private Client client1 = null;  
        private async void ReloadClients(string id)
        {
            //await Task.Delay(10000);
            Background.SyncRonService.Model.Contragent.Client client = GetConterAgents(id).FirstOrDefault(c => c.Contragent_ID == id);
            _context = new ApplicationContext();
            List<ClientContact> clientContacts1 = _context.Set<ClientContact>().ToList();
            ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == id);
            try
            {
                if (client != null)
                {
                    if (clientInfo != null)
                    {
                        if (_context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId) != null)
                        {
                            client1 = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);
                            _context.Set<Client>().Remove(_context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId));
                        }
                        if (_context.Set<ClientPhone>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId) != null)
                        {
                            _context.Set<ClientPhone>().RemoveRange(_context.Set<ClientPhone>().Where(c => c.ClientId == clientInfo.ClientId));
                        }
                        if (_context.Set<CallClient>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId) != null)
                        {
                            _context.Set<CallClient>().RemoveRange(_context.Set<CallClient>().Where(c => c.ClientId == clientInfo.ClientId));
                        }
                        if (_context.Set<ClientContact>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId) != null)
                        {
                            _context.Set<ClientContact>().RemoveRange(_context.Set<ClientContact>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId));
                        }
                        _context.Set<ClientInfo>().Remove(clientInfo);
                        _context.SaveChanges();
                        clientContacts1 = _context.Set<ClientContact>().ToList();
                        CreateNewClient(client);
                    }
                    else
                    {
                        CreateNewClient(client);
                    }
                    ReloadClientsCalls(id);

                }
                else
                {
                    if (_context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId) != null)
                    {
                        _context.Set<Client>().Remove(_context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId));
                    }
                    if (_context.Set<ClientPhone>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId) != null)
                    {
                        _context.Set<ClientPhone>().RemoveRange(_context.Set<ClientPhone>().Where(c => c.ClientId == clientInfo.ClientId));
                    }
                    if (_context.Set<CallClient>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId) != null)
                    {
                        _context.Set<CallClient>().RemoveRange(_context.Set<CallClient>().Where(c => c.ClientId == clientInfo.ClientId));
                    }
                    if (_context.Set<ClientContact>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId) != null)
                    {
                        _context.Set<ClientContact>().RemoveRange(_context.Set<ClientContact>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId));
                    }
                    _context.Set<ClientInfo>().Remove(clientInfo);
                    //_context.Set<Data.Entities.OneCInfo.ClientInfo>().RemoveRange(_context.Set<Data.Entities.OneCInfo.ClientInfo>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId));
                    //_context.Set<Data.Entities.Clients.Client>().RemoveRange(_context.Set<Data.Entities.Clients.Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId));
                    //_context.Set<Data.Entities.Clients.ClientPhone>().RemoveRange(_context.Set<Data.Entities.Clients.ClientPhone>().Where(c => c.ClientId == clientInfo.ClientId));
                    //_context.Set<CallClient>().RemoveRange(_context.Set<CallClient>().Where(c => c.ClientId == clientInfo.ClientId));
                    //_context.Set<ClientContact>().RemoveRange(_context.Set<ClientContact>().Where(c => c.ClientId == clientInfo.ClientId));
                    _context.SaveChanges();
                }
            }
            catch (Exception e)
            {
            }
        }

        private void CreateNewClient(Background.SyncRonService.Model.Contragent.Client client)
        {
            var userInfos = _context.Set<UserInfo>()
                  .Where(x => x.UserId != 1 && x.UserId != 11)
                  .ToList();
            if (client != null)
            {
                NumberOfCalls numberOfCalls = client.Periodichnost_Zvonkov == "0" ? NumberOfCalls.WithoutType : client.Periodichnost_Zvonkov == "10" ? NumberOfCalls.OnePerMonth : client.Periodichnost_Zvonkov == "20"
                            ? NumberOfCalls.OnePerTwoWeek : client.Periodichnost_Zvonkov == "30" ? NumberOfCalls.ThreePerMonth : client.Periodichnost_Zvonkov == "40" ? NumberOfCalls.OnePerWeek : client.Periodichnost_Zvonkov == "50" ?
                            NumberOfCalls.FivePerMonth : client.Periodichnost_Zvonkov == "60" ? NumberOfCalls.SixPerMonth : client.Periodichnost_Zvonkov == "90" ? NumberOfCalls.TwoPerWeek : NumberOfCalls.WithoutType;

                NumberOfShipments numberOfShipments = client.Periodichnost_Otgruzok == "0" ? NumberOfShipments.WithoutType : client.Periodichnost_Zvonkov == "10" ? NumberOfShipments.OnePerMonth : client.Periodichnost_Zvonkov == "20"
                   ? NumberOfShipments.OnePerTwoWeek : client.Periodichnost_Zvonkov == "30" ? NumberOfShipments.ThreePerMonth : client.Periodichnost_Zvonkov == "40" ? NumberOfShipments.OnePerWeek : client.Periodichnost_Zvonkov == "50" ?
                   NumberOfShipments.FivePerMonth : client.Periodichnost_Zvonkov == "60" ? NumberOfShipments.SixPerMonth : client.Periodichnost_Zvonkov == "90" ? NumberOfShipments.TwoPerWeek : NumberOfShipments.WithoutType;
                ClientGroup clientGroup = ClientGroup.NewOrReanimated;

                if(this.client1 != null)
                {
                    numberOfCalls = this.client1.NumberOfCalls;
                    numberOfShipments = this.client1.NumberOfShipments;
                    clientGroup = this.client1.Group;
                }

                Data.Entities.Clients.Client client1 = _context.Set<Client>()
                                                       .Add(new Client(new ClientCreate()
                                                       {
                                                           ClientType = ClientTypes.Middle1,
                                                           Title = client.Contragent,
                                                           LegalEntity = client.Contragent_NameFull,
                                                           NumberOfCalls = numberOfCalls,
                                                           NumberOfShipments = numberOfShipments,
                                                           Group = clientGroup
                                                       })).Entity;
                client1.IsAcctive = true;
                _context.Set<Client>().Add(client1);
                _context.SaveChanges();
                ClientInfo clientInfo = _context.Set<ClientInfo>()
                                            .Add(new ClientInfo(client1.Id, Guid.Parse(client.Contragent_ID), client.Phones)).Entity;
                _context.SaveChanges();
                if (client.GR_Contragent != "" && _context.Set<ClientGR>().FirstOrDefault(c => c.NameGr == client.GR_Contragent) == null)
                {
                    _context.Set<ClientGR>().Add(new ClientGR()
                    {
                        Clients = new List<Data.Entities.Clients.Client>()
                                {
                                    client1
                                },
                        NameGr = client.GR_Contragent
                    });
                }
                else if(client.GR_Contragent != "")
                {
                    ClientGR clientGR = _context.Set<ClientGR>().FirstOrDefault(c => c.NameGr == client.GR_Contragent);
                    if(clientGR.Clients != null)
                    {
                        clientGR.Clients.Add(client1);
                    }
                    else
                    {
                        clientGR.Clients = new List<Client>()
                        {
                            client1
                        };
                    }
                }
                _context.SaveChanges();
                if (client.Manager_ID != null && client.Manager_ID != "")
                {
                    var managersGuidStr = client.Manager_ID.Split(',');
                    var managersGuid = new List<Guid>();
                    foreach (var str in managersGuidStr)
                    {
                        try
                        {
                            managersGuid.Add(Guid.Parse(str));
                        }
                        catch
                        {
                        }
                    }
                    foreach (Guid guid in managersGuid)
                    {
                        var userInfo = userInfos.FirstOrDefault(x => x.OneCId == guid);
                        if (userInfo != null)
                        {
                            var workGroup = _context.Set<WorkGroup>()
                                .FirstOrDefault(x => x.RegionalManagerId == userInfo.UserId
                                                     || x.EscortManagerId == userInfo.UserId);
                            if (workGroup != null && workGroup.Clients.FirstOrDefault(c => c.ClientId == clientInfo.ClientId) == null)
                            {
                                workGroup.BindClient(new BindClient()
                                {
                                    ClientId = client1.Id,
                                    WorkgroupId = workGroup.Id
                                });
                            }
                        }
                    }
                }
                _context.SaveChanges();
                if (client.Phones != null && client.Phones != "")
                {
                    var e = client.Phones.Split(',');
                    var clientPhones = _context.Set<ClientPhone>().Where(c => c.ClientId == clientInfo.ClientId);
                    foreach (var phone in e)
                    {
                        string newPhone = Regex.Replace(phone, @"[^0-9]", "");
                        if (clientPhones == null || clientPhones.FirstOrDefault(c => c.Phone != null && (c.Phone == newPhone || c.Phone == newPhone.Substring(1) || c.Phone == newPhone.Substring(2))) == null)
                        {
                            ClientPhone clientPhone = new ClientPhone()
                            {
                                Client = client1,
                                Phone = newPhone,
                            }; 
                            //if (newPhone.Length == 10)
                            //{
                            //}
                            //else if (newPhone.Length == 11)
                            //{
                            //    newPhone = newPhone.Substring(1);
                            //    clientPhone = new ClientPhone()
                            //    {
                            //        Client = client1,
                            //        Phone = newPhone,
                            //    };
                            //}
                            //else if (newPhone.Length == 12)
                            //{
                            //    newPhone = newPhone.Substring(2);
                            //    clientPhone = new ClientPhone()
                            //    {
                            //        Client = client1,
                            //        Phone = newPhone,
                            //    };
                            //}
                            _context.Set<ClientPhone>().Add(clientPhone);
                            _context.SaveChanges();
                        }
                    }
                }
            }
        }

        private void ReloadPhone(string phones, Client client)
        {
            List<ClientPhone> clientPhones = _context.Set<ClientPhone>().Where(c => c.ClientId == client.Id).ToList();
            if (phones != null && phones != "")
            {
                var e = phones.Split(',');
                foreach (ClientPhone clientPhone1 in clientPhones)
                {
                    string phone = e.FirstOrDefault(p => Regex.Replace(p, @"[^0-9]", "") == clientPhone1.Phone);
                    if (phone == null)
                    {
                        _context.Set<Data.Entities.Clients.ClientPhone>().Remove(clientPhone1);
                    }
                }
                foreach (var phone in e)
                {
                    string newPhone = Regex.Replace(phone, @"[^0-9]", "");
                    ClientPhone clientPhone = clientPhones.FirstOrDefault(c => (c.ClientId == client.Id) && (c.Phone != null && (c.Phone == newPhone || c.Phone == newPhone.Substring(1) || c.Phone == newPhone.Substring(2))));

                    if (clientPhone == null)
                    {
                        clientPhone = new ClientPhone()
                        {
                            Client = client,
                            Phone = newPhone,
                        };
                        //if (newPhone.Length == 10)
                        //{
                        //}
                        //else if (newPhone.Length == 11)
                        //{
                        //    newPhone = newPhone.Substring(1);
                        //    clientPhone = new ClientPhone()
                        //    {
                        //        Client = client,
                        //        Phone = newPhone,
                        //    };
                        //}
                        //else if (newPhone.Length == 12)
                        //{
                        //    newPhone = newPhone.Substring(2);
                        //    clientPhone = new ClientPhone()
                        //    {
                        //        Client = client,
                        //        Phone = newPhone,
                        //    };
                        //}
                        _context.Set<ClientPhone>().Add(clientPhone);
                    }
                    _context.SaveChanges();
                }
            }
            else
            {
                _context.Set<Data.Entities.Clients.ClientPhone>().RemoveRange(_context.Set<Data.Entities.Clients.ClientPhone>().Where(c => c.ClientId == client.Id));
                _context.SaveChanges();
            }
        }

        private List<Background.SyncRonService.Model.Contragent.Client> GetConterAgents(string id)
        {
            request =(HttpWebRequest)WebRequest.Create($"https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_Contragents?$filter=substringof(\'{id}\',Contragent_ID)&$format=json");
            request.UserAgent = "World Sushi";
            System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
            request.Credentials = new NetworkCredential("chuprina.r.v@gmail.com", "123");
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream receiveStream = response.GetResponseStream();
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            string content = readStream.ReadToEnd();
            var responseAppS = JObject.Parse(content);
            List<Background.SyncRonService.Model.Contragent.Client> clients = JsonConvert.DeserializeObject<List<Background.SyncRonService.Model.Contragent.Client>>(responseAppS.
                        SelectToken("value").ToString());
            return clients;
        }

        private void ReloadClientsCalls(string id)
        {
            _myCallsApiService = new MyCallsAPIService(_context);
            _myCallsAPIServiceAstrics = new MyCallsAPIServiceAstrics(_context);
            _myCallsApiService.SaveNewCalls();
            _myCallsAPIServiceAstrics.SaveNewCalls();
            ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == id);

            var managersPhone = _context.Set<Manager>()
                .Select(x => new Manager()
                {
                    Id = x.Id,
                    Phone = PhoneHelper.ConvertToPhone(x.Phone)
                }).ToList();

            var clientPhone = _context.Set<ClientPhone>()
                .Where(c => c.ClientId == clientInfo.ClientId)
                .Select(x => new
                {
                    ClientId = x.ClientId,
                    Phone = x.Phone
                }).ToList();
            List<CallLog> callsLog = _context.Set<CallLog>().ToList();
            var a = callsLog.Where(x => (x.SrcNumber != "" && x.ClientNumber != "")
                ? managersPhone.Select(z => PhoneHelper.ConvertToPhone(z.Phone)).Contains(PhoneHelper.ConvertToPhone(x.SrcNumber))
                  && clientPhone.Select(z => PhoneHelper.ConvertToPhone(z.Phone)).Contains(PhoneHelper.ConvertToPhone(x.ClientNumber))
                : false).ToList();
            var dt = new DateTime(1970, 1, 1);
            var clientContacts = new List<ClientContact>();
            var workGroups = _context.Set<WorkGroup>().ToList();
            var calls = new List<CallInfo>();
            List<CallClient> callClients = _context.Set<CallClient>().ToList();
            List<ClientContact> clientContacts1 = _context.Set<ClientContact>().ToList();
            foreach (var call in a)
            {
                try
                {
                    CallInfo callInfo = _context.Set<CallInfo>().FirstOrDefault(c => c.CallLogId == call.Id);
                    if (callInfo == null)
                    {
                        calls.Add(new CallInfo()
                        {
                            Call = new CallClient()
                            {
                                ClientId = clientPhone
                                    .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.ClientNumber))).ClientId,
                                ManagerId = managersPhone
                                    .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.SrcNumber))).Id,
                                Duration = call.Duration,
                                Recording = call.Recording,
                                DateTime = dt + TimeSpan.FromSeconds(call.StartTime),
                                Direction = call.Direction
                            },
                            CallLog = call
                        });
                    }
                }
                catch (Exception e)
                {

                }
            }
            _context.Set<CallInfo>()
                .AddRange(calls);
            _context.SaveChanges();
            foreach (var call in calls)
            {
                try
                {
                    var clientContact = new ClientContact(
                    new ClientContactCreate()
                    {
                        ClientId = ((CallClient)call.Call).ClientId,
                        ContactType = ClientContactType.NoAcceptCall,
                        ManagerId = ((CallClient)call.Call).ManagerId,
                        ManagerType = workGroups.FirstOrDefault(x => x.EscortManagerId == ((CallClient)call.Call).ManagerId) != null
                            ? ManagerType.EscortManager
                            : workGroups.FirstOrDefault(x => x.RegionalManagerId == ((CallClient)call.Call).ManagerId) != null
                                ? ManagerType.RegionalManager
                                : ManagerType.Undefined,

                    });
                    clientContact.Date = dt + TimeSpan.FromSeconds(call.CallLog.StartTime);
                    clientContact.Direction = ((CallClient)call.Call).Direction;
                    clientContact.CallId = call.Call.Id;
                    clientContacts.Add(clientContact);
                }
                catch (Exception e)
                {

                }
            }
            _context.Set<ClientContact>()
                .AddRange(clientContacts);
            _context.SaveChanges();
        }
    }
}