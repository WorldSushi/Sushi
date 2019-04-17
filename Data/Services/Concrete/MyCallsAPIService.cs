using Data.DTO.Calls;
using System;
using System.IO;
using System.Linq;
using System.Net;
using Newtonsoft.Json.Linq;
using Data.Services.Abstract;
using Base.Extensions;

namespace Data.Services.Concrete
{
    public class MyCallsAPIService: IMyCallsAPIService
    {
        private readonly IManagerService _managerService;
        private readonly DateTime referencePoint = new DateTime(2019, 2, 1);

        public MyCallsAPIService(IManagerService managerService)
        {
            _managerService = managerService;
        }

        public DateTime GetReferencePoint()
        {
            return referencePoint;
        }

        public CallsDTO GetCallsByDate(DateTime dateFrom, int results_next_offset = 0)
        {
            Int32 dateStart = (Int32)(dateFrom.Date.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            Int32 dateEnd = (Int32)(dateFrom.AddDays(1).Date.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;

            string json = @"{ 
                ""user_name"":""fin@tdmirsushi.ru"", 
                ""api_key"":""uvxlcqy420x3i10h580036lfqooh7sa7"", 
                ""action"":""calls.list"", 
                ""from_date"": " + dateStart + @",
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

        public CallsDTO GetCallsByDate(DateTime dateFrom, DateTime dateFor, int results_next_offset = 0)
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

        public CallsDTO GetCallsByDateAndManager(DateTime dateFrom, int managerId)
        {
            var managerPhone = _managerService.Get(managerId).Phone;

            var managerCalls = GetCallsByDate(dateFrom);

            managerCalls.Results = managerCalls.Results
                .Where(x => x.Client_number.PhoneFormat() == managerPhone
                    && x.Duration > 150)
                .ToList();

            return managerCalls;
        }

        public CallsDTO GetCallsByDateAndManager(DateTime dateFrom, DateTime dateFor, int managerId)
        {
            //var managerPhone = _managerService.Get(managerId).Phone;

            var managerCalls = GetCallsByDate(dateFrom, dateFor, 0);
            var results_next_offset_index = 0;
            
            while(Convert.ToInt32(managerCalls.Results_next_offset) != 0)
            {
                results_next_offset_index += Convert.ToInt32(managerCalls.Results_next_offset);

                var nextPartsOfCalls = GetCallsByDate(dateFrom, dateFor, Convert.ToInt32(results_next_offset_index));

                managerCalls.Results_next_offset = nextPartsOfCalls.Results_next_offset;

                managerCalls.Results = managerCalls.Results.Concat(nextPartsOfCalls.Results).ToList();
            }


            managerCalls.Results = managerCalls.Results
                .Where(x => x.Client_number.PhoneFormat() == "+79009151781"
                    && x.Duration > 150)
                .OrderByDescending(x => x.Start_time)
                .ToList();

            return managerCalls;
        }
    }
}
