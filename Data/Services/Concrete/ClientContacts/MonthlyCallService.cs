using System;
using System.Linq;
using Base.Extensions;
using Data.DTO.Calls;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;

namespace Data.Services.Concrete.ClientContacts
{
    public class MonthlyCallService : IMonthlyCallService
    {
        private readonly IMyCallsAPIService _myCallsApiService;

        public MonthlyCallService(IMyCallsAPIService myCallsApiService)
        {
            _myCallsApiService = myCallsApiService;
        }

        public IQueryable<CallDTO> GetMonthlyCalls(int month)
        {
            var dateStart = new DateTime(DateTime.Now.Year, month, 1);
            var dateEnd = dateStart.AddMonths(1).AddDays(-1);

            if(dateEnd > DateTime.Now)
                dateEnd = DateTime.Now;

            int dateStartSeconds = (int)dateStart
                .Date.Subtract(new DateTime(1970, 1, 1))
                .TotalSeconds;

            int dateEndSeconds = (int)dateEnd
                .Date.Subtract(new DateTime(1970, 1, 1))
                .TotalSeconds;


            var calls = _myCallsApiService.GetCallsByDate(dateStart, dateEnd, 0);

            var nextOffset = Convert.ToInt32(calls.Results_next_offset);
            while (nextOffset > 0)
            {
                var buf = _myCallsApiService.GetCallsByDate(dateStart, dateEnd, nextOffset);
                nextOffset = Convert.ToInt32(buf.Results_next_offset);

                foreach (var callDto in buf.Results)
                {
                    calls.Results.Add(callDto);
                }
            }

            return calls.Results
                .Where(x => x.Duration > 150)
                .AsQueryable();
        }

        private void WobNeProebat()
        {
            var dateStart = new DateTime(DateTime.Now.Year, 4, 1);
            var dateEnd = dateStart.AddMonths(1).AddDays(-1);

            if (dateEnd > DateTime.Now)
                dateEnd = DateTime.Now;

            int dateStartSeconds = (int)dateStart
                .Date.Subtract(new DateTime(1970, 1, 1))
                .TotalSeconds;

            int dateEndSeconds = (int)dateEnd
                .Date.Subtract(new DateTime(1970, 1, 1))
                .TotalSeconds;


            var calls = _myCallsApiService.GetCallsByDate(dateStart, dateEnd, 0);

            var nextOffset = Convert.ToInt32(calls.Results_next_offset);
            while (nextOffset > 0)
            {
                var buf = _myCallsApiService.GetCallsByDate(dateStart, dateEnd, nextOffset);
                nextOffset = Convert.ToInt32(buf.Results_next_offset);

                foreach (var callDto in buf.Results)
                {
                    calls.Results.Add(callDto);
                }
            }

            var filter = calls.Results
                .Where(x => x.Src_number == "+79009151781" && x.Duration > 150)
                .OrderByDescending(x => x.Start_time)
                .ToList();
        }
    }
}