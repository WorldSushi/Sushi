using Data.DTO.Calls;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using Newtonsoft.Json.Linq;
using Data.Services.Abstract;
using Base.Helpers;
using Data.Commands.ClientContacts.ClientContact;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.Users;
using Data.Enums;

namespace Data.Services.Concrete
{
    public class MyCallsAPIService: IMyCallsAPIService
    {
        private readonly ApplicationContext _context;

        public MyCallsAPIService(ApplicationContext context)
        {
            _context = context;
        }

        //Получаю новые звонки дольше 2.5 минут
        //Создаю CallLogs
        //Создаю Calls
        //Связываю с помощью CallInfo
        public void SaveNewCalls()
        {
            //_context.Set<CallLog>().RemoveRange(_context.Set<CallLog>());
            //_context.SaveChanges();
            //_context.Set<CallInfo>().RemoveRange(_context.Set<CallInfo>());
            //_context.SaveChanges();
            //_context.Set<ClientContact>().RemoveRange(_context.Set<ClientContact>());
            //_context.SaveChanges();
            //_context.Set<ContactManager>().RemoveRange(_context.Set<ContactManager>());
            //_context.SaveChanges();
            //_context.Set<Call>().RemoveRange(_context.Set<Call>());
            //_context.SaveChanges();
            //_context.Set<MonthCallsInfo>().RemoveRange(_context.Set<MonthCallsInfo>());
            //_context.SaveChanges();

            var monthCallsInfo = GetCurrentMonthCallsInfo();
            if (monthCallsInfo.Loading)
                return;

            monthCallsInfo.Loading = true;

            _context.SaveChanges();

            var callsLog = new List<CallLog>();

            CallsDTO response = GetCallsByDate(
                new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1),
                new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day),
                monthCallsInfo.Offset);

            if (Convert.ToInt32(response.Results_next_offset) > 0)
                monthCallsInfo.ChangeOffset(Convert.ToInt32(response.Results_next_offset));
            else
                monthCallsInfo.ChangeOffset(
                    monthCallsInfo.Offset + Convert.ToInt32(response.Results_count));

            callsLog.AddRange(response.Results/*.Where(c => c.Client_number == "+79641619304")*/.Select(x => new CallLog()
            {
                Answer_time = x.Answer_time,
                Answered = x.Answered,
                ClientName = x.Client_name,
                ClientNumber = x.Client_number,
                DbCallId = x.Db_call_id,
                Direction = x.Direction,
                Duration = x.Duration,
                EndTime = x.End_time,
                Recording = x.Recording,
                UserAccount = x.User_account,
                StartTime = x.Start_time,
                SrcNumber = x.Src_number,
                UserId = x.User_id,
                SrcId = x.Src_id,
                SrcSlot = x.Src_slot
            }));

            while (Convert.ToInt32(response.Results_next_offset) > 0)
            {
                response = GetCallsByDate(
                    new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1),
                    new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day),
                    monthCallsInfo.Offset);
                if (Convert.ToInt32(response.Results_next_offset) > 0)
                    monthCallsInfo.ChangeOffset(Convert.ToInt32(response.Results_next_offset));
                else
                    monthCallsInfo.ChangeOffset(
                        monthCallsInfo.Offset + Convert.ToInt32(response.Results_count));

                callsLog.AddRange(response.Results/*.Where(c => c.Client_number.Contains("+79641619304"))*/.Select(x => new CallLog()
                {
                    Answer_time = x.Answer_time,
                    Answered = x.Answered,
                    ClientName = x.Client_name,
                    ClientNumber = x.Client_number,
                    DbCallId = x.Db_call_id,
                    Direction = x.Direction,
                    Duration = x.Duration,
                    EndTime = x.End_time,
                    Recording = x.Recording,
                    UserAccount = x.User_account,
                    StartTime = x.Start_time,
                    SrcNumber = x.Src_number,
                    UserId = x.User_id,
                    SrcId = x.Src_id,
                    SrcSlot = x.Src_slot
                }));
            }

            var managersPhone = _context.Set<Manager>()
                .Select(x => new Manager()
                {
                    Id = x.Id,
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
                  && clientPhone.Select(z => PhoneHelper.ConvertToPhone(z.Phone)).Contains(PhoneHelper.ConvertToPhone(x.ClientNumber))
                : false).ToList();
            

            var b = callsLog.Where(x => x.ClientName.Contains("Мир Суши")).ToList();

            b.AddRange(callsLog.Where(x => (x.SrcNumber != "" && x.ClientNumber != "")
                ? managersPhone.Select(z => z.Phone).Contains(PhoneHelper.ConvertToPhone(x.SrcNumber))
                  && managersPhone.Select(z => z.Phone).Contains(PhoneHelper.ConvertToPhone(x.ClientNumber))
                : false).ToList());

            var calls = new List<CallInfo>();
            var calls1 = new List<CallInfo>();
            var clientContacts = new List<ClientContact>();
            var managerContacts = new List<ContactManager>();

            var workGroups = _context.Set<WorkGroup>().ToList();

            var dt = new DateTime(1970, 1, 1).AddHours(3);

            List<CallInfo> callInfos = _context.Set<CallInfo>().ToList();


            foreach (var call in a)
            {
                try
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
                        CallLog = callsLog.FirstOrDefault(x => x.ClientNumber == call.ClientNumber
                                                               && x.SrcNumber == call.SrcNumber
                                                               && x.StartTime == call.StartTime)
                    });
                }
                catch (Exception e)
                {

                }
            }

            foreach (var call in b)
            {
                try
                {
                    calls1.Add(new CallInfo()
                    {
                        Call = new CallManager()
                        {
                            ManagerIdC = managersPhone
                    .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.ClientNumber))).Id,
                            ManagerId = managersPhone
                    .FirstOrDefault(x => x.Phone.Contains(PhoneHelper.ConvertToPhone(call.SrcNumber))).Id,
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
                catch (Exception e)
                {

                }
            }





            _context.Set<CallInfo>()
                .AddRange(calls);
            _context.Set<CallInfo>()
                .AddRange(calls1);
            _context.Set<CallLog>()
                .AddRange(callsLog);


            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {

            }

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
                    clientContact.Call = call.Call;
                    clientContacts.Add(clientContact);
                }
                catch (Exception e)
                {

                }
            }

            var s = clientContacts.Where(c => c.ClientId == 3413);

            foreach (var call in calls1)
            {
                try
                {
                    var managerContact = new ContactManager(
                    new ClientContactCreate()
                    {
                        ClientId = ((CallManager)call.Call).ManagerIdC,
                        ContactType = ClientContactType.ManagerCall,
                        ManagerId = ((CallManager)call.Call).ManagerId,
                        ManagerType = workGroups.FirstOrDefault(x => x.EscortManagerId == ((CallManager)call.Call).ManagerId) != null
                            ? ManagerType.EscortManager
                            : workGroups.FirstOrDefault(x => x.RegionalManagerId == ((CallManager)call.Call).ManagerId) != null
                                ? ManagerType.RegionalManager
                                : ManagerType.Undefined
                    });
                    managerContact.Date = dt + TimeSpan.FromSeconds(call.CallLog.StartTime);
                    managerContact.Direction = ((CallManager)call.Call).Direction;
                    managerContact.CallId = call.Call.Id;
                    managerContacts.Add(managerContact);
                }
                catch (Exception e)
                {

                }
            }

            _context.Set<ClientContact>()
                .AddRange(clientContacts);
            _context.Set<ContactManager>()
                .AddRange(managerContacts);

            monthCallsInfo.Loading = false;
            try
            {
                _context.SaveChanges();
            }
            catch (Exception e)
            {

            }

            //var s1 = _context.Set<CallLog>().ToList();
            //var s2 = _context.Set<ClientContact>().ToList();
            //var s3 = _context.Set<ContactManager>().ToList();
            //var s4 = _context.Set<CallInfo>().ToList();
        }


        private CallsDTO GetCallsByDate(DateTime dateFrom, DateTime dateFor, int results_next_offset)
        {
            Int32 dateStart = (Int32)(dateFrom.Date.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            Int32 dateEnd = (Int32)(dateFor.Date.AddDays(1).Subtract(new DateTime(1970, 1, 1))).TotalSeconds;

            string json = @"{ 
                ""user_name"":""fin@tdmirsushi.ru"", 
                ""api_key"":""uvxlcqy420x3i10h580036lfqooh7sa7"", 
                ""action"":""calls.list"", 
                ""from_date"": " + dateStart + @",
                ""to_date"": " + dateEnd + @",
                ""from_offset"": " + results_next_offset + @",
                ""max_results"": 100, 
                ""supervised"": 1}";

            var request = (HttpWebRequest)WebRequest.Create("https://mirsushi.moizvonki.ru/api/v1");
            request.Method = "POST";
            request.ContentType = "application/json";

            using (var reqStream = request.GetRequestStream())
            using (var writer = new StreamWriter(reqStream))
            {
                writer.Write(json);
            }

            string str;
            CallsDTO managerCalls;

            WebResponse response = request.GetResponse();
            using (Stream stream = response.GetResponseStream())
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    str = reader.ReadToEnd();
                    JObject responseJson = JObject.Parse(str);

                    managerCalls = responseJson.ToObject<CallsDTO>();
                }
            }
            response.Close();

            return managerCalls;
        }
        
        private MonthCallsInfo GetCurrentMonthCallsInfo()
        {
            var monthCallsInfo = _context.Set<MonthCallsInfo>()
                .FirstOrDefault(x => DateHelper.IsCurrentMonth(x.Date));

            if (monthCallsInfo == null)
                monthCallsInfo = _context.Set<MonthCallsInfo>()
                    .Add(new MonthCallsInfo(0))
                    .Entity;

            return monthCallsInfo;
        }
    }
}
