using Base;
using Data.Commands.ClientContacts;
using Data.Entities.ClientContacts;
using Data.Services.Abstract.ClientContacts;
using System.Linq;

namespace Data.Services.Concrete.ClientContacts
{
    public class MonthlyBusinessTripPlanService : IMonthlyBusinessTripService
    {
        private readonly IRepository<MonthlyBusinessTripPlan> _monthlyBusinessTripPlanRepository;

        public MonthlyBusinessTripPlanService(IRepository<MonthlyBusinessTripPlan> monthlyBusinessTripPlanRepository)
        {
            _monthlyBusinessTripPlanRepository = monthlyBusinessTripPlanRepository;
        }

        public IQueryable<MonthlyBusinessTripPlan> GetAll()
        {
            return _monthlyBusinessTripPlanRepository.All();
        }

        public MonthlyBusinessTripPlan Create(MonthlyBusinessTripPlanCreateCommand command)
        {
            return _monthlyBusinessTripPlanRepository.Create(new MonthlyBusinessTripPlan(command.ManagerId, command.ClientId, command.AmountTrips, command.Month));
        }

        public MonthlyBusinessTripPlan GetPlan(int managerId, int clientId, int month)
        {
            return _monthlyBusinessTripPlanRepository.All()
                .FirstOrDefault(x => x.ManagerId == managerId && x.ClientId == clientId && x.Date.Month == month);
        }

        public int GetPlannedBusinessTripAmount(int managerId, int clientId, int month)
        {
            return GetPlan(managerId, clientId, month)?.AmountBusinessTrip ?? 0;
        }
    }
}
