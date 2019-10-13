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
using System.Threading;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    public class OneCController : ControllerBase
    {
        private ApplicationContext _context;
        private HttpWebRequest request = null;

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


        //"CRM_Contragents"
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

        private async void ReloadClients(string id)
        {
            await Task.Delay(10000);
            Background.SyncRonService.Model.Contragent.Client client = GetConterAgents(id).FirstOrDefault(c => c.Contragent_ID == id);
            _context = new ApplicationContext();
            ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == id);
            try
            {
                if (client != null )
                {
                    if (clientInfo != null)
                    {
                        Client client1 = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);
                        client1.LegalEntity = client.Contragent_NameFull;
                        client1.Title = client.Contragent;
                        ReloadPhone(client.Phones, client1);
                    }
                    else
                    {
                        CreateNewClient(client);
                    }
                    ReloadClientsCalls(id);
                }
                else
                {
                    Client client1 = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);
                    List<ClientPhone> clientPhones = _context.Set<ClientPhone>().Where(c => c.ClientId == clientInfo.ClientId).ToList();
                    if (clientInfo != null)
                    {
                        _context.Set<Data.Entities.OneCInfo.ClientInfo>().RemoveRange(_context.Set<Data.Entities.OneCInfo.ClientInfo>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId));
                        _context.Set<Data.Entities.Clients.Client>().RemoveRange(_context.Set<Data.Entities.Clients.Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId));
                        _context.Set<Data.Entities.Clients.ClientPhone>().RemoveRange(_context.Set<Data.Entities.Clients.ClientPhone>().Where(c => c.ClientId == clientInfo.ClientId));
                        //_context.Set<Data.Entities.Clients.ClientGR>().Remove(_context.Set<Data.Entities.Clients.ClientGR>().FirstOrDefault(c => c.ClientId == clientInfo.ClientId));
                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            _context.SaveChanges();
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

                Data.Entities.Clients.Client client1 = _context.Set<Client>()
                                                       .Add(new Client(new ClientCreate()
                                                       {
                                                           ClientType = ClientTypes.Middle1,
                                                           Title = client.Contragent,
                                                           LegalEntity = client.Contragent_NameFull,
                                                           NumberOfCalls = numberOfCalls,
                                                           NumberOfShipments = numberOfShipments,
                                                           Group = ClientGroup.NewOrReanimated

                                                       })).Entity;
                client1.IsAcctive = true;
                ClientInfo clientInfo = _context.Set<ClientInfo>()
                                            .Add(new ClientInfo(client1, Guid.Parse(client.Contragent_ID), client.Phones)).Entity;
                _context.SaveChanges();
                _context.Set<ClientGR>().Add(new ClientGR()
                {
                    Client = client1,
                    ClientId = client1.Id,
                    NameGr = client.GR_Contragent
                });
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
                    var userInfo = userInfos.FirstOrDefault(x => managersGuid.Contains(x.OneCId));
                    if (userInfo != null)
                    {
                        var workGroup = _context.Set<WorkGroup>()
                            .FirstOrDefault(x => x.RegionalManagerId == userInfo.UserId
                                                 || x.EscortManagerId == userInfo.UserId);

                        workGroup.BindClient(new BindClient()
                        {
                            ClientId = client1.Id,
                            WorkgroupId = workGroup.Id
                        });
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
            List<CallInfo> callInfos = _context.Set<CallInfo>().ToList();
            ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == id);
            Client client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);

            var managersPhone = _context.Set<Manager>()
                .Select(x => new Manager()
                {
                    Id = x.Id,
                    Phone = PhoneHelper.ConvertToPhone(x.Phone)
                }).ToList();

            var clientPhone = _context.Set<ClientPhone>()
                //.Where(c => c.ClientId)
                .Select(x => new
                {
                    ClientId = x.ClientId,
                    Phone = x.Phone
                }).ToList();

            var a = callInfos.Where(x => (x.CallLog.SrcNumber != "" && x.CallLog.ClientNumber != "")
                ? managersPhone.Select(z => z.Phone).Contains(PhoneHelper.ConvertToPhone(x.CallLog.SrcNumber))
                  && clientPhone.Select(z => PhoneHelper.ConvertToPhone(z.Phone)).Contains(PhoneHelper.ConvertToPhone(x.CallLog.ClientNumber))
                : false).ToList();
            var dt = new DateTime(1970, 1, 1);
            var clientContacts = new List<ClientContact>();
            var workGroups = _context.Set<WorkGroup>().ToList();

            foreach (var call in a)
            {
                if (_context.Set<ClientContact>().FirstOrDefault(c => c.Call.Id == call.CallId) == null)
                {
                    var clientContact = new ClientContact(
                    new ClientContactCreate()
                    {
                        ClientId = call.Call.ClientId,
                        ContactType = ClientContactType.NoAcceptCall,
                        ManagerId = call.Call.ManagerId,
                        ManagerType = workGroups.FirstOrDefault(x => x.EscortManagerId == call.Call.ManagerId) != null
                            ? ManagerType.EscortManager
                            : workGroups.FirstOrDefault(x => x.RegionalManagerId == call.Call.ManagerId) != null
                                ? ManagerType.RegionalManager
                                : ManagerType.Undefined,

                    });
                    clientContact.Date = dt + TimeSpan.FromSeconds(call.CallLog.StartTime);
                    clientContact.Direction = call.Call.Direction;
                    clientContact.Call = call.Call;
                    clientContacts.Add(clientContact);
                }
            }
            _context.Set<ClientContact>()
                .AddRange(clientContacts);
            _context.SaveChanges();
        }

        //private ResponseOneCDto EditPhone(string idContragent, string phone, string oldPhone)
        //{
        //    ResponseOneCDto responseOneC = new ResponseOneCDto();
        //    responseOneC.Status = "OK";
        //    if(oldPhone != null && oldPhone != "")
        //    {
        //        responseOneC.Command = "EditPhone";
        //        if (idContragent == null && idContragent == "")
        //        {
        //            responseOneC.Description = "param idContragent is emty";
        //            return responseOneC;
        //        }
        //        if (phone == null && phone == "")
        //        {
        //            responseOneC.Description = "param phone is emty";
        //            return responseOneC;
        //        }
        //        ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == idContragent);
        //        if (clientInfo != null)
        //        {
        //            Client client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);
        //            string oldPhoneCurrenr = Regex.Replace(oldPhone, @"[^0-9]", "");
        //            if (oldPhoneCurrenr.Length == 11)
        //            {
        //                oldPhoneCurrenr = oldPhoneCurrenr.Substring(1);
        //            }
        //            else if (oldPhoneCurrenr.Length == 12)
        //            {
        //                oldPhoneCurrenr = oldPhoneCurrenr.Substring(2);
        //            }
        //            ClientPhone clientPhone = _context.Set<ClientPhone>().FirstOrDefault(c => c.Phone == oldPhoneCurrenr);
        //            if(clientPhone != null)
        //            {
        //                string newPhone = Regex.Replace(phone, @"[^0-9]", "");
        //                if (oldPhoneCurrenr.Length == 11)
        //                {
        //                    newPhone = newPhone.Substring(1);
        //                }
        //                else if (oldPhoneCurrenr.Length == 12)
        //                {
        //                    newPhone = newPhone.Substring(2);
        //                }
        //                clientPhone.Phone = newPhone;
        //                _context.SaveChanges();
        //            }
        //            else
        //            {
        //                string newPhone = Regex.Replace(phone, @"[^0-9]", "");
        //                ClientPhone clientPhone1 = null;
        //                if (newPhone.Length == 10)
        //                {
        //                    clientPhone1 = new ClientPhone()
        //                    {
        //                        Client = client,
        //                        Phone = newPhone,
        //                    };
        //                }
        //                else if (newPhone.Length == 11)
        //                {
        //                    newPhone = newPhone.Substring(1);
        //                    clientPhone1 = new ClientPhone()
        //                    {
        //                        Client = client,
        //                        Phone = newPhone,
        //                    };
        //                }
        //                else if (newPhone.Length == 12)
        //                {
        //                    newPhone = newPhone.Substring(2);
        //                    clientPhone1 = new ClientPhone()
        //                    {
        //                        Client = client,
        //                        Phone = newPhone,
        //                    };
        //                }
        //                if (clientPhone1 != null)
        //                {
        //                    _context.Set<ClientPhone>().Add(clientPhone1);
        //                    _context.SaveChanges();
        //                }
        //                else
        //                {
        //                    responseOneC.Description = "Wrong mobile phone format";
        //                }
        //                responseOneC.Description = "There is no such phone, but we got it";
        //            }
        //        }
        //        else
        //        {
        //            responseOneC.Description = "There is no such counterparty";
        //        }
        //    }
        //    else
        //    {
        //        responseOneC.Command = "NewPhone";
        //        if (phone == null && phone == "")
        //        {
        //            responseOneC.Description = "param phone is emty";
        //            return responseOneC;
        //        }
        //        ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == idContragent);
        //        if (clientInfo != null)
        //        {
        //            Client client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);

        //            string newPhone = Regex.Replace(phone, @"[^0-9]", "");
        //            ClientPhone clientPhone1 = null;
        //            if (newPhone.Length == 10)
        //            {
        //                clientPhone1 = new ClientPhone()
        //                {
        //                    Client = client,
        //                    Phone = newPhone,
        //                };
        //            }
        //            else if (newPhone.Length == 11)
        //            {
        //                newPhone = newPhone.Substring(1);
        //                clientPhone1 = new ClientPhone()
        //                {
        //                    Client = client,
        //                    Phone = newPhone,
        //                };
        //            }
        //            else if (newPhone.Length == 12)
        //            {
        //                newPhone = newPhone.Substring(2);
        //                clientPhone1 = new ClientPhone()
        //                {
        //                    Client = client,
        //                    Phone = newPhone,
        //                };
        //            }
        //            if (clientPhone1 != null)
        //            {
        //                _context.Set<ClientPhone>().Add(clientPhone1);
        //                _context.SaveChanges();
        //            }
        //            else
        //            {
        //                responseOneC.Description = "Wrong mobile phone format";
        //            }
        //        }
        //        else
        //        {
        //            responseOneC.Description = "There is no such counterparty";
        //        }
        //    }
        //    return responseOneC;
        //}

        //private ResponseOneCDto RemoveConteragent(string idContragent)
        //{
        //    ResponseOneCDto responseOneC = new ResponseOneCDto();
        //    if (idContragent != null && idContragent != "")
        //    {
        //        ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == idContragent);
        //        if (clientInfo != null)
        //        {
        //            Client client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);
        //            client.IsAcctive = false;
        //            _context.SaveChanges();
        //        }
        //        else
        //        {
        //            responseOneC.Description = "There is no such counterparty";
        //        }
        //    }
        //    else
        //    {
        //        responseOneC.Description = "param idContragent is emty";
        //    }
        //    responseOneC.Command = "RemoveConteragent";
        //    responseOneC.Status = "OK";
        //    return responseOneC;
        //}

        //private ResponseOneCDto NewConterAgent()
        //{
        //    ResponseOneCDto responseOneC = new ResponseOneCDto();
        //    responseOneC = new ResponseOneCDto()
        //    {
        //        Result = null,
        //        Command = "NotCommant",
        //        Description = "Development team",
        //        Status = "OK",
        //    };
        //    return responseOneC;
        //}

        //private ResponseOneCDto GetCommand()
        //{
        //    ResponseOneCDto responseOneC = new ResponseOneCDto();
        //    responseOneC.Result = new
        //    {
        //        apiUrl = "http://hanasyo.ru/api.OneC",
        //        resurse = new List<object>()
        //        {
        //            new
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Resume/",
        //                Method = "GET",
        //                Redy = "YES",
        //                NameCommand = "GetResume: To All",
        //                param = new List<string>()
        //                {
                            
        //                }
        //            },
        //            new
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Resume?idClient=idClient",
        //                Method = "GET",
        //                Redy = "YES",
        //                NameCommand = "GetResume: To idClient",
        //                param = new List<string>()
        //                {
        //                    "idClient, Type:string"
        //                }
        //            },
        //            new
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Resume/?year=year&monthe=monthe",
        //                Method = "GET",
        //                Redy = "YES",
        //                NameCommand = "GetResume: To Monthe and Year",
        //                param = new List<string>()
        //                {
        //                    "year, Type:int",
        //                    "monthe, Type:int",
        //                }
        //            },
        //            new
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Resume/?idClient=idClient&year=year&monthe=monthe",
        //                Method = "GET",
        //                Redy = "YES",
        //                NameCommand = "GetResume: To idClient and Monthe and Year",
        //                param = new List<string>()
        //                {

        //                    "idClient, Type:string",
        //                    "year, Type:int",
        //                    "monthe, Type:int"
        //                }
        //            },
        //            new 
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Clinet/Edit",
        //                Method = "POST",
        //                Redy = "NO",
        //                NameCommand = "NewConterAgent",
        //                param = new List<string>()
        //                {
        //                    "command = NewConterAgent, Type:string",
        //                    "conteragent, Type:Client"
        //                }
        //            },
        //            new
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Clinet/Edit?command=RemoveConteragent&idContragent=idContragent",
        //                Method = "GET",
        //                Redy = "YES",
        //                NameCommand = "RemoveConteragent",
        //                param = new List<string>()
        //                {
        //                    "command = RemoveConteragent, Type:string",
        //                    "idContragent, Type:string"
        //                }
        //            },
        //            new
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Clinet/Edit?command=EditPhone&idContragent=idContragent&phone=phone",
        //                Method = "GET",
        //                Redy = "YES",
        //                NameCommand = "NewPhone",
        //                param = new List<string>()
        //                {
        //                    "command = EditPhone, Type:string",
        //                    "idContragent, Type:string",
        //                    "phone, Type:string",
        //                }
        //            },
        //            new
        //            {
        //                Url = "http://hanasyo.ru/api.OneC/Clinet/Edit?command=EditPhone&idContragent=idContragent&phone=phone&oldPhone=oldPhone",
        //                Method = "GET",
        //                Redy = "YES",
        //                NameCommand = "EditPhone",
        //                param = new List<string>()
        //                {
        //                    "command = EditPhone, Type:string",
        //                    "idClient, Type:string",
        //                    "oldPhone, Type:string",
        //                    "phone, Type:string",
        //                }
        //            },
        //        },
        //    };
        //    responseOneC.Status = "OK";
        //    responseOneC.Command = "Help";
        //    return responseOneC;
        //}
    }
}