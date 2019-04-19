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

        public MonthlyCallPlan GetPlan(int managerId, int clientId, int month)
        {
            return GetAll().FirstOrDefault(x => x.ManagerId == managerId
                                     && x.ClientId == clientId
                                     && x.Date.Month == month);
        }

        public int GetPlanAmountCalls(int managerId, int clientId, int month)
        {
            return GetPlan(managerId, clientId, month)?.AmountCalls ?? 0;
        }

        public int GetPlanAmountCalls(int clientId, int month)
        {
            return GetAll().Where(x => x.ClientId == clientId
                                       && x.Date.Month == month)
                .Sum(x => x.AmountCalls);
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