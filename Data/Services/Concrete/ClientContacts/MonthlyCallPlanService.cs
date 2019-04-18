using System.Linq;
using Base;
using Data.Commands.ClientContacts;
using Data.Entities.ClientContacts;
using Data.Services.Abstract.ClientContacts;

namespace Data.Services.Concrete.ClientContacts
{
    public class MonthlyCallPlanService : IMonthlyCallPlanService
    {
        private readonly IRepository<MonthlyCallPlan> _monthlyCallPlanRepository;

        public MonthlyCallPlanService(IRepository<MonthlyCallPlan> monthlyCallPlanRepository)
        {
            _monthlyCallPlanRepository = monthlyCallPlanRepository;
        }

        public IQueryable<MonthlyCallPlan> GetAll()
        {
            return _monthlyCallPlanRepository.All();
        }

        public void Create(MonthlyCallPlanCreateCommand command)
        {
            _monthlyCallPlanRepository.Create(
                new MonthlyCallPlan(
                    command.ManagerId,
                    command.ClientId,
                    command.AmountCalls,
                    command.Month));
        }
    }
}