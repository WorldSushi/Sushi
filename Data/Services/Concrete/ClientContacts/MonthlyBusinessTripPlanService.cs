using Base;
using Data.Commands.ClientContacts;
using Data.Entities.ClientContacts;
using Data.Enums;
using Data.Services.Abstract.ClientContacts;
using System.Linq;

namespace Data.Services.Concrete.ClientContacts
{
    public class MonthlyBusinessTripPlanService : IMonthlyBusinessTripService
    {
        private readonly IRepository<BusinessTripPlan> _monthlyBusinessTripPlanRepository;

        public MonthlyBusinessTripPlanService(IRepository<BusinessTripPlan> monthlyBusinessTripPlanRepository)
        {
            _monthlyBusinessTripPlanRepository = monthlyBusinessTripPlanRepository;
        }

        public IQueryable<BusinessTripPlan> GetAll()
        {
            return _monthlyBusinessTripPlanRepository.All();
        }

        public BusinessTripPlan Create(BusinessTripPlanCreateCommand command)
        {
            return _monthlyBusinessTripPlanRepository.Create(
                new BusinessTripPlan(command));
        }

        public BusinessTripPlan GetPlan(int managerId, int clientId, int month)
        {
            return _monthlyBusinessTripPlanRepository.All()
                .FirstOrDefault(x => x.ManagerId == managerId && x.ClientId == clientId && x.Date.Month == month);
        }

        public BusinessTripCompletedType GetPlanCompletedType(int managerId, int clientId, int month)
        {
            var businessTrip = GetPlan(managerId, clientId, month);

            return businessTrip != null
                ? businessTrip.BusinessTripCompletedType
                : BusinessTripCompletedType.DidntCompleted;
        }

        public int GetPlannedBusinessTripAmount(int managerId, int clientId, int month)
        {
            return GetPlan(managerId, clientId, month)?.NumberBusinessTripHours ?? 0;
        }

        public int GetPlanAmountTrips(int clientId, int month)
        {
            return GetAll().Where(x => x.ClientId == clientId && x.Date.Month == month)
                .Sum(x => x.NumberBusinessTripHours);
        }

        public BusinessTripPlan Update(MonthlyBusinessTripPlanUpdateCommand value)
        {
            var monthlyTripPlan = _monthlyBusinessTripPlanRepository.Get(value.Id);

            monthlyTripPlan.BusinessTripCompletedType = value.BusinessTripCompletedType;

            _monthlyBusinessTripPlanRepository.Update(monthlyTripPlan);

            return monthlyTripPlan;
        }
    }
}
