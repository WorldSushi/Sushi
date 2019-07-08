using System;
using System.Linq;
using Base.Extensions;
using Data.DTO.Calls;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;
using Microsoft.Extensions.Caching.Memory;

namespace Data.Services.Concrete.ClientContacts
{
    public class MonthlyCallService : IMonthlyCallService
    {
        private readonly IMyCallsAPIService _myCallsApiService;
        private readonly IMemoryCache _memoryCache;

        public MonthlyCallService(IMyCallsAPIService myCallsApiService,
            IMemoryCache memoryCache)
        {
            _myCallsApiService = myCallsApiService;
            _memoryCache = memoryCache;
        }

        /*public IQueryable<CallDTO> GetMonthlyCalls(int month)
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

            var calls = new CallsDTO();

            if (!_memoryCache.TryGetValue("calls", out calls))
            {
                calls = _myCallsApiService.GetCallsByDate(dateStart, dateEnd, 0);

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

                _memoryCache.Set("calls", calls, new MemoryCacheEntryOptions()
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(72)
                });
            }

            return calls.Results
                .Where(x => x.Duration >= 150 && Convert.ToInt32(x.Direction) == 1)
                .AsQueryable();
        }*/

        /*private void WobNeProebat()
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
        }*/
    }
}