using Data.Entities.ClientContacts;
using Data.Enums;
using System.Linq;
using Data.Commands.ClientContacts.BusinessTripPlan;

namespace Data.Services.Abstract.ClientContacts
{
    public interface IMonthlyBusinessTripService
    {
        IQueryable<BusinessTripPlan> GetAll();
        BusinessTripPlan GetPlan(int managerId, int clientId, int month);
        int GetPlannedBusinessTripAmount(int managerId, int clientId, int month);

        BusinessTripCompletedType GetPlanCompletedType(int managerId, int clientId, int month);
        int GetPlanAmountTrips(int clientId, int month);

        BusinessTripPlan Create(BusinessTripPlanCreate command);
        //BusinessTripPlan Update(MonthlyBusinessTripPlanUpdateCommand command);
    }
}
