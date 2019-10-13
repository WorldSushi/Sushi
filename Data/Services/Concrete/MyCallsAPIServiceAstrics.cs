using Base.Helpers;
using Data.Commands.ClientContacts.ClientContact;
using Data.DTO.Calls;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.Users;
using Data.Enums;
using Data.Services.Abstract;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;

namespace Data.Services.Concrete
{
    public class MyCallsAPIServiceAstrics : IMyCallsAPIServiceAstrics
    {
        private readonly ApplicationContext _context;

        public MyCallsAPIServiceAstrics(ApplicationContext context)
        {
            _context = context;
        }

        public void SaveNewCalls()
        {
            var monthCallsInfo = GetCurrentMonthCallsInfo();

            if (monthCallsInfo.Loading)
                return;

            monthCallsInfo.Loading = true;

            _context.SaveChanges();

            var callsLog = new List<CallLog>();
            CallsDTOAstrics response = null;

            try
            {

                response = GetCallsByDate(monthCallsInfo.LastId,
                    new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1),
                    new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day));
            }
            catch
            {
                monthCallsInfo.Loading = false;

                _context.SaveChanges();
            }

            callsLog.AddRange(response.Results.Select(x => new CallLog()
            {
                Answer_time = "",
                Answered = "1",
                ClientName = "",
                ClientNumber = x.Src,
                DbCallId = x.Id,
                Direction = "",
                Duration = Convert.ToInt32(x.Billsec),
                EndTime = (Int32)(Convert.ToDateTime(x.End).Date.Subtract(new DateTime(1970, 1, 1))).TotalSeconds,
                Recording = x.Filename,
                UserAccount =  "",
                StartTime = (Int32)(Convert.ToDateTime(x.Start).Date.Subtract(new DateTime(1970, 1, 1))).TotalSeconds,
                SrcNumber = x.Dst,
                UserId = "",
                SrcId = "",
                SrcSlot = ""
            }));

            //callsLog = callsLog.Where(x => x.Duration >= 150).ToList();

            var managersPhone = _context.Set<Manager>()
                .Select(x => new
                {
                    ManagerId = x.Id,
                    Phone = PhoneHelper.ConvertToPhone(x.Phone)
                }).ToList();

            var clientPhone = _context.Set<ClientPhone>()
                .Select(x => new
                {
                    ClientId = x.ClientId,
                    Phone = x.Phone
                }).ToList();

            var a = callsLog.Where(x => (x.SrcNumber != "" && x.ClientNumber != "")
                ? managersPhone.Select(z => z.Phone).Contains(PhoneHelper.ConvertToPhone(x.SrcNumber))
                  && (clientPhone.Select(z => PhoneHelper.ConvertToPhone(z.Phone)).Contains(PhoneHelper.ConvertToPhone(x.ClientNumber)) || x.ClientNumber == "143")
                : false).ToList();

            var b = callsLog.Where(x => (x.SrcNumber != "" && x.ClientNumber != "")
                ? managersPhone.Select(z => z.Phone).Contains(PhoneHelper.ConvertToPhone(x.SrcNumber))
                  && x.ClientNumber.Length == 3 && x.ClientNumber != "143" : false).ToList();

            var calls = new List<CallInfo>();
            var calls1 = new List<CallInfo>();
            var clientContacts = new List<ClientContact>();

            var workGroups = _context.Set<WorkGroup>().ToList();

            var dt = new DateTime(1970, 1, 1);

            foreach (var call in a)
            {
                if (_context.Set<CallInfo>().FirstOrDefault(c => c.CallLog.Recording == call.Recording) == null)
                {
                    calls.Add(new CallInfo()
                    {
                        Call = new Call()
                        {
                            ClientId = clientPhone
                            .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.ClientNumber))).ClientId,
                            ManagerId = managersPhone
                            .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.SrcNumber))).ManagerId,
                            Duration = call.Duration,
                            Recording = call.Recording,
                            DateTime = dt + TimeSpan.FromSeconds(call.StartTime),
                            Direction = call.Direction
                        },
                        CallLog = callsLog.FirstOrDefault(x => x.ClientNumber == call.ClientNumber
                                                               && x.SrcNumber == call.SrcNumber
                                                               && x.StartTime == call.StartTime)
                    });
                }
            }

            foreach (var call in b)
            {
                if (_context.Set<CallInfo>().FirstOrDefault(c => c.CallLog.Recording == call.Recording) == null)
                {
                    calls1.Add(new CallInfo()
                    {
                        Call = new Call()
                        {
                            ClientId = clientPhone
                            .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.ClientNumber))).ClientId,
                            ManagerId = managersPhone
                            .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.SrcNumber))).ManagerId,
                            Duration = call.Duration,
                            Recording = call.Recording,
                            DateTime = dt + TimeSpan.FromSeconds(call.StartTime),
                            Direction = call.Direction
                        },
                        CallLog = callsLog.FirstOrDefault(x => x.ClientNumber == call.ClientNumber
                                                               && x.SrcNumber == call.SrcNumber
                                                               && x.StartTime == call.StartTime)
                    });
                }
            }

            foreach (var call in calls)
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
                                : ManagerType.Undefined
                    });

                clientContact.Date = dt + TimeSpan.FromSeconds(call.CallLog.StartTime);
                clientContact.Direction = call.Call.Direction;
                clientContact.Call = call.Call;
                clientContacts.Add(clientContact);
            }

            foreach (var call in calls1)
            {
                var clientContact = new ClientContact(
                    new ClientContactCreate()
                    {
                        ClientId = call.Call.ClientId,
                        ContactType = ClientContactType.ManagerCall,
                        ManagerId = call.Call.ManagerId,
                        ManagerType = workGroups.FirstOrDefault(x => x.EscortManagerId == call.Call.ManagerId) != null
                            ? ManagerType.EscortManager
                            : workGroups.FirstOrDefault(x => x.RegionalManagerId == call.Call.ManagerId) != null
                                ? ManagerType.RegionalManager
                                : ManagerType.Undefined
                    });

                clientContact.Date = dt + TimeSpan.FromSeconds(call.CallLog.StartTime);
                clientContact.Direction = call.Call.Direction;
                clientContact.Call = call.Call;
                clientContacts.Add(clientContact);
            }

            monthCallsInfo.ChangeOffset(Convert.ToInt32(response.LastId));
            _context.Set<CallLog>()
                .AddRange(callsLog);

            _context.Set<CallInfo>()
                .AddRange(calls);
            _context.Set<CallInfo>()
                .AddRange(calls1);

            _context.Set<ClientContact>()
                .AddRange(clientContacts);

            monthCallsInfo.Loading = false;

            _context.SaveChanges();
        }

        private CallsDTOAstrics GetCallsByDate(int idLastCall, DateTime dateFrom, DateTime dateFor)
        {
            string res = null;
            CallsDTOAstrics callsDTOAstrics = new CallsDTOAstrics();
            callsDTOAstrics.Results = new List<CallDTOAsterics>();
            while (true)
            {
                //string s = dateFrom.ToString("Y-m-d H:i:s");

                HttpWebRequest request = null;
                if (idLastCall == 0)
                {
                    request = (HttpWebRequest)WebRequest.Create($"http://95.181.199.172/stream/gethistory.php?StartDate={dateFrom.ToString("yyyy-MM-dd hh:mm:ss")}&EndDate={dateFor.ToString("yyyy-MM-dd hh:mm:ss")}");
                }
                else
                {
                    request = (HttpWebRequest)WebRequest.Create($"http://95.181.199.172/stream/gethistory.php?LastID={idLastCall}");
                }
                request.Method = "GET";
                request.ContentType = "application/json";
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (StreamReader reader = new StreamReader(stream))
                {
                    res = reader.ReadToEnd();
                }
                try
                {
                    List<CallDTOAsterics> callDTOAsterics = JsonConvert.DeserializeObject<List<CallDTOAsterics>>(res);
                    if (callDTOAsterics.Count != 0)
                    {
                        callsDTOAstrics.Results.AddRange(callDTOAsterics);
                        idLastCall = Convert.ToInt32(callDTOAsterics.Last().Id);
                    }
                    else
                    {
                        callsDTOAstrics.LastId = callsDTOAstrics.Results.Count != 0 ? Convert.ToInt32(callsDTOAstrics.Results.Last().Id) : 0;
                        break;
                    }
                }
                catch (Exception e)
                {

                }
            }
            return callsDTOAstrics;
        }

        private MonthCallsInfoAsterics GetCurrentMonthCallsInfo()
        {
            MonthCallsInfoAsterics monthCallsInfoAsterics = _context.Set<MonthCallsInfoAsterics>()
                .FirstOrDefault(x => DateHelper.IsCurrentMonth(x.Date));

            if (monthCallsInfoAsterics == null)
                monthCallsInfoAsterics = _context.Set<MonthCallsInfoAsterics>()
                    .Add(new MonthCallsInfoAsterics(0))
                    .Entity;

            return monthCallsInfoAsterics;
        }

        private string GetDFormat(string data)
        {
            DateTime date;
            if (DateTime.TryParseExact(data, "MM.dd.yyyy", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "dd.MM.yyyy", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "yyyy.MM.dd", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "MM-dd-yyyy", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "dd-MM-yyyy", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "yyyy-MM-dd", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "MM/dd/yyyy", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "dd/MM/yyyy", null, DateTimeStyles.None, out date))
            {
            }
            else if (DateTime.TryParseExact(data, "yyyy/MM/dd", null, DateTimeStyles.None, out date))
            {
            }
            return date.ToShortDateString();
        }
    }
}
