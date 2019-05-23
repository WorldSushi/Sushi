using Data.Commands.ClientContacts;
using Data.DTO.WeeklyPlan;
using Data.Entities.ClientContacts;
using System.Linq;

namespace Data.Services.Abstract.ClientContacts
{
    public interface IWeekPlanService
    {

        IQueryable<WeekPlanDTO> GetWeekPlansByClient(int clientId, int managerId, int month);
        WeekPlan GetWeekPlan(int id);

        void WeekPlanUpdate(WeekPlanDTO WeekPlan);

        WeekPlan CreateWeekPlan(WeekPlanCreateCommand weekPlan);

    }
}
