using System.Linq;
using Data.Commands.ClientContacts.CallPlan;
using Data.Entities.ClientContacts;

namespace Data.Services.Abstract.ClientContacts
{
    public interface IMonthlyCallPlanService
    {
        IQueryable<CallPlan> GetAll();
        CallPlan GetPlan(int managerId, int clientId, int month);
        int GetPlanAmountCalls(int managerId, int clientId, int month);
        int GetPlanAmountCalls(int clientId, int month);

        void Create(CallPlanCreate command);
    }
}