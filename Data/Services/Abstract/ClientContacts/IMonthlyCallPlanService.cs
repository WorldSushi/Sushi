using System.Linq;
using Data.Commands.ClientContacts;
using Data.Entities.ClientContacts;

namespace Data.Services.Abstract.ClientContacts
{
    public interface IMonthlyCallPlanService
    {
        IQueryable<MonthlyCallPlan> GetAll();

        void Create(MonthlyCallPlanCreateCommand command);
    }
}