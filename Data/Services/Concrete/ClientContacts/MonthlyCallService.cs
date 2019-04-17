using System;
using System.Linq;
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

        public int GetMonthlyCalls(int managerId, int clientId, int month)
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

            return _myCallsApiService.GetCallsByDateAndManager(dateStart, dateEnd, managerId)
                .Results.Count;
        }
    }
}