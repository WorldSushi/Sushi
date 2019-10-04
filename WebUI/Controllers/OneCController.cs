using Data;
using Data.DTO.Clients;
using Data.DTO.OneC;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace WebUI.Controllers
{
    public class OneCController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public OneCController(ApplicationContext context)
        {
            _context = context;
        }

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

        [HttpGet]
        [Route("api.OneC/Clinet/Edit")]
        public ResponseOneCDto SerClient(string command, string idContragent, string phone, string oldPhone)
        {
            ResponseOneCDto responseOneC = null;
            if(command != null && command != "")
            {
                if(command == "helpe")
                {
                    responseOneC = GetCommand();
                }
                else if (command == "NewConterAgent")
                {
                    responseOneC = NewConterAgent();
                }
                else if (command == "RemoveConteragent")
                {
                    responseOneC = RemoveConteragent(idContragent);
                }
                else if (command == "EditPhone")
                {
                    responseOneC = EditPhone(idContragent, phone, oldPhone);
                }
                else
                {
                    responseOneC = new ResponseOneCDto()
                    {
                        Result = null,
                        Command = "NotCommant",
                        Status = "OK",
                    };
                }
            }
            else
            {
                responseOneC = new ResponseOneCDto()
                {
                    Result = null,
                    Command = "NotCommant",
                    Status = "OK",
                };
            }
            return responseOneC;
        }

        private ResponseOneCDto EditPhone(string idContragent, string phone, string oldPhone)
        {
            ResponseOneCDto responseOneC = new ResponseOneCDto();
            responseOneC.Status = "OK";
            if(oldPhone != null && oldPhone != "")
            {
                responseOneC.Command = "EditPhone";
                if (idContragent == null && idContragent == "")
                {
                    responseOneC.Description = "param idContragent is emty";
                    return responseOneC;
                }
                if (phone == null && phone == "")
                {
                    responseOneC.Description = "param phone is emty";
                    return responseOneC;
                }
                ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == idContragent);
                if (clientInfo != null)
                {
                    Client client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);
                    string oldPhoneCurrenr = Regex.Replace(oldPhone, @"[^0-9]", "");
                    if (oldPhoneCurrenr.Length == 11)
                    {
                        oldPhoneCurrenr = oldPhoneCurrenr.Substring(1);
                    }
                    else if (oldPhoneCurrenr.Length == 12)
                    {
                        oldPhoneCurrenr = oldPhoneCurrenr.Substring(2);
                    }
                    ClientPhone clientPhone = _context.Set<ClientPhone>().FirstOrDefault(c => c.Phone == oldPhoneCurrenr);
                    if(clientPhone != null)
                    {
                        string newPhone = Regex.Replace(phone, @"[^0-9]", "");
                        if (oldPhoneCurrenr.Length == 11)
                        {
                            newPhone = newPhone.Substring(1);
                        }
                        else if (oldPhoneCurrenr.Length == 12)
                        {
                            newPhone = newPhone.Substring(2);
                        }
                        clientPhone.Phone = newPhone;
                        _context.SaveChanges();
                    }
                    else
                    {
                        string newPhone = Regex.Replace(phone, @"[^0-9]", "");
                        ClientPhone clientPhone1 = null;
                        if (newPhone.Length == 10)
                        {
                            clientPhone1 = new ClientPhone()
                            {
                                Client = client,
                                Phone = newPhone,
                            };
                        }
                        else if (newPhone.Length == 11)
                        {
                            newPhone = newPhone.Substring(1);
                            clientPhone1 = new ClientPhone()
                            {
                                Client = client,
                                Phone = newPhone,
                            };
                        }
                        else if (newPhone.Length == 12)
                        {
                            newPhone = newPhone.Substring(2);
                            clientPhone1 = new ClientPhone()
                            {
                                Client = client,
                                Phone = newPhone,
                            };
                        }
                        if (clientPhone1 != null)
                        {
                            _context.Set<ClientPhone>().Add(clientPhone1);
                            _context.SaveChanges();
                        }
                        else
                        {
                            responseOneC.Description = "Wrong mobile phone format";
                        }
                        responseOneC.Description = "There is no such phone, but we got it";
                    }
                }
                else
                {
                    responseOneC.Description = "There is no such counterparty";
                }
            }
            else
            {
                responseOneC.Command = "NewPhone";
                if (phone == null && phone == "")
                {
                    responseOneC.Description = "param phone is emty";
                    return responseOneC;
                }
                ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == idContragent);
                if (clientInfo != null)
                {
                    Client client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);

                    string newPhone = Regex.Replace(phone, @"[^0-9]", "");
                    ClientPhone clientPhone1 = null;
                    if (newPhone.Length == 10)
                    {
                        clientPhone1 = new ClientPhone()
                        {
                            Client = client,
                            Phone = newPhone,
                        };
                    }
                    else if (newPhone.Length == 11)
                    {
                        newPhone = newPhone.Substring(1);
                        clientPhone1 = new ClientPhone()
                        {
                            Client = client,
                            Phone = newPhone,
                        };
                    }
                    else if (newPhone.Length == 12)
                    {
                        newPhone = newPhone.Substring(2);
                        clientPhone1 = new ClientPhone()
                        {
                            Client = client,
                            Phone = newPhone,
                        };
                    }
                    if (clientPhone1 != null)
                    {
                        _context.Set<ClientPhone>().Add(clientPhone1);
                        _context.SaveChanges();
                    }
                    else
                    {
                        responseOneC.Description = "Wrong mobile phone format";
                    }
                }
                else
                {
                    responseOneC.Description = "There is no such counterparty";
                }
            }
            return responseOneC;
        }

        private ResponseOneCDto RemoveConteragent(string idContragent)
        {
            ResponseOneCDto responseOneC = new ResponseOneCDto();
            if (idContragent != null && idContragent != "")
            {
                ClientInfo clientInfo = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == idContragent);
                if (clientInfo != null)
                {
                    Client client = _context.Set<Client>().FirstOrDefault(c => c.Id == clientInfo.ClientId);
                    client.IsAcctive = false;
                    _context.SaveChanges();
                }
                else
                {
                    responseOneC.Description = "There is no such counterparty";
                }
            }
            else
            {
                responseOneC.Description = "param idContragent is emty";
            }
            responseOneC.Command = "RemoveConteragent";
            responseOneC.Status = "OK";
            return responseOneC;
        }

        private ResponseOneCDto NewConterAgent()
        {
            ResponseOneCDto responseOneC = new ResponseOneCDto();
            responseOneC = new ResponseOneCDto()
            {
                Result = null,
                Command = "NotCommant",
                Description = "Development team",
                Status = "OK",
            };
            return responseOneC;
        }

        private ResponseOneCDto GetCommand()
        {
            ResponseOneCDto responseOneC = new ResponseOneCDto();
            responseOneC.Result = new
            {
                apiUrl = "http://hanasyo.ru/api.OneC",
                resurse = new List<object>()
                {
                    new
                    {
                        Url = "http://hanasyo.ru/api.OneC/Resume/",
                        Method = "GET",
                        Redy = "YES",
                        NameCommand = "GetResume: To All",
                        param = new List<string>()
                        {
                            
                        }
                    },
                    new
                    {
                        Url = "http://hanasyo.ru/api.OneC/Resume?idClient=idClient",
                        Method = "GET",
                        Redy = "YES",
                        NameCommand = "GetResume: To idClient",
                        param = new List<string>()
                        {
                            "idClient, Type:string"
                        }
                    },
                    new
                    {
                        Url = "http://hanasyo.ru/api.OneC/Resume/?year=year&monthe=monthe",
                        Method = "GET",
                        Redy = "YES",
                        NameCommand = "GetResume: To Monthe and Year",
                        param = new List<string>()
                        {
                            "year, Type:int",
                            "monthe, Type:int",
                        }
                    },
                    new
                    {
                        Url = "http://hanasyo.ru/api.OneC/Resume/?idClient=idClient&year=year&monthe=monthe",
                        Method = "GET",
                        Redy = "YES",
                        NameCommand = "GetResume: To idClient and Monthe and Year",
                        param = new List<string>()
                        {

                            "idClient, Type:string",
                            "year, Type:int",
                            "monthe, Type:int"
                        }
                    },
                    new 
                    {
                        Url = "http://hanasyo.ru/api.OneC/Clinet/Edit",
                        Method = "POST",
                        Redy = "NO",
                        NameCommand = "NewConterAgent",
                        param = new List<string>()
                        {
                            "command = NewConterAgent, Type:string",
                            "conteragent, Type:Client"
                        }
                    },
                    new
                    {
                        Url = "http://hanasyo.ru/api.OneC/Clinet/Edit?command=RemoveConteragent&idContragent=idContragent",
                        Method = "GET",
                        Redy = "YES",
                        NameCommand = "RemoveConteragent",
                        param = new List<string>()
                        {
                            "command = RemoveConteragent, Type:string",
                            "idContragent, Type:string"
                        }
                    },
                    new
                    {
                        Url = "http://hanasyo.ru/api.OneC/Clinet/Edit?command=EditPhone&idContragent=idContragent&phone=phone",
                        Method = "GET",
                        Redy = "YES",
                        NameCommand = "NewPhone",
                        param = new List<string>()
                        {
                            "command = EditPhone, Type:string",
                            "idContragent, Type:string",
                            "phone, Type:string",
                        }
                    },
                    new
                    {
                        Url = "http://hanasyo.ru/api.OneC/Clinet/Edit?command=EditPhone&idContragent=idContragent&phone=phone&oldPhone=oldPhone",
                        Method = "GET",
                        Redy = "YES",
                        NameCommand = "EditPhone",
                        param = new List<string>()
                        {
                            "command = EditPhone, Type:string",
                            "idClient, Type:string",
                            "oldPhone, Type:string",
                            "phone, Type:string",
                        }
                    },
                },
            };
            responseOneC.Status = "OK";
            responseOneC.Command = "Help";
            return responseOneC;
        }
    }
}