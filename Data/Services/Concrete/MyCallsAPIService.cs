using Data.DTO.Calls;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using Newtonsoft.Json.Linq;
using Data.Services.Abstract;
using Base.Extensions;
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
            var monthCallsInfo = GetCurrentMonthCallsInfo();

            var callsLog = new List<CallLog>();

            var response = GetCallsByDate(
                new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1),
                new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day),
                monthCallsInfo.Offset);

            if (Convert.ToInt32(response.Results_next_offset) > 0)
                monthCallsInfo.ChangeOffset(Convert.ToInt32(response.Results_next_offset));
            else
                monthCallsInfo.ChangeOffset(
                    monthCallsInfo.Offset + Convert.ToInt32(response.Results_count));

            callsLog.AddRange(response.Results.Select(x => new CallLog()
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

                callsLog.AddRange(response.Results.Select(x => new CallLog()
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

            callsLog = callsLog.Where(x => x.Duration >= 150).ToList();

            var managersPhone = _context.Set<Manager>()
                .Select(x => x.Phone.Substring(2).Replace(",", "")).ToList();

            /*var clientPhone = _context.Set<Client>()
                .Select(x => x.Phone).ToList();*/
            var clientPhone = _context.Set<ClientPhone>()
                .Select(x => x.Phone).ToList();

            var a = callsLog.Where(x => (x.SrcNumber != "" && x.ClientNumber != "")
                ? managersPhone.Contains(x.SrcNumber.Substring(2))
                  && clientPhone.Contains(x.ClientNumber.Substring(2))
                : false).ToList();

            var calls = new List<CallInfo>();
            var clientContact = new List<ClientContact>();

            var workGroups = _context.Set<WorkGroup>().ToList();

            var dt = new DateTime(1970, 1, 1);

            foreach (var call in a)
            {
                calls.Add(new CallInfo()
                {
                    Call = new Call()
                    {
                        ClientId =_context.Set<ClientPhone>()
                            .FirstOrDefault(x => x.Phone.Contains(call.ClientNumber.Substring(2))).ClientId,
                            //_context.Set<Client>()
                            //.FirstOrDefault(x => x.Phone.Contains(call.ClientNumber.Substring(2))).Id,
                        ManagerId = _context.Set<Manager>()
                            .FirstOrDefault(x => x.Phone.Contains(call.SrcNumber.Substring(2))).Id,
                        Duration = call.Duration,
                        Recording = call.Recording,
                        DateTime = dt + TimeSpan.FromSeconds(call.StartTime)
                    },
                    CallLog = callsLog.FirstOrDefault(x => x.ClientNumber == call.ClientNumber
                                                           && x.SrcNumber == call.SrcNumber
                                                           && x.StartTime == call.StartTime)
                });
            }

            foreach (var call in calls)
            {
                clientContact.Add(
                    new ClientContact(
                        new ClientContactCreate()
                        {
                            ClientId = call.Call.ClientId,
                            ContactType = ClientContactType.Call,
                            ManagerId = call.Call.ManagerId,
                            ManagerType = workGroups.FirstOrDefault(x => x.EscortManagerId == call.Call.ManagerId) != null
                                ? ManagerType.EscortManager
                                : workGroups.FirstOrDefault(x => x.RegionalManagerId == call.Call.ManagerId) != null
                                    ? ManagerType.RegionalManager
                                    : ManagerType.Undefined
                        }));
            }

            _context.Set<CallLog>()
                .AddRange(callsLog);

            _context.Set<CallInfo>()
                .AddRange(calls);

            _context.Set<ClientContact>()
                .AddRange(clientContact);

            _context.SaveChanges();
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
