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

        public MyCallsAPIService(IManagerService managerService)
        {
            _managerService = managerService;
        }

        public CallsDTO GetCallsByDate(DateTime date)
        {
            Int32 dateStart = (Int32)(date.Date.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            Int32 dateEnd = (Int32)(date.AddDays(1).Date.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;

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

        public CallsDTO GetCallsByDateAndManager(DateTime date, int managerId)
        {
            var managerPhone = _managerService.Get(managerId).Phone;

            var managerCalls = GetCallsByDate(date);

            managerCalls.Results = managerCalls.Results
                .Where(x => x.Client_number.PhoneFormat() == managerPhone
                    && x.Duration > 150)
                .ToList();

            return managerCalls;
        }
    }
}
