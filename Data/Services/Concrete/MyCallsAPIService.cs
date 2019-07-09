using Data.DTO.Calls;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using Newtonsoft.Json.Linq;
using Data.Services.Abstract;
using Base.Extensions;
using Base.Helpers;
using Data.Entities.Calls;

namespace Data.Services.Concrete
{
    public class MyCallsAPIService: IMyCallsAPIService
    {
        private readonly ApplicationContext _context;

        public MyCallsAPIService(ApplicationContext context)
        {
            _context = context;
        }

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

            _context.Set<CallLog>()
                .AddRange(callsLog);

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
