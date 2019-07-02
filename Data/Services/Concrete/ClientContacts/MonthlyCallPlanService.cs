using System;
using System.Linq;
using Base;
using Data.Commands.ClientContacts.CallPlan;
using Data.Entities.ClientContacts;
using Data.Services.Abstract.ClientContacts;

namespace Data.Services.Concrete.ClientContacts
{
    public class MonthlyCallPlanService : IMonthlyCallPlanService
    {
        private readonly IRepository<CallPlan> _monthlyCallPlanRepository;

        public MonthlyCallPlanService(IRepository<CallPlan> monthlyCallPlanRepository)
        {
            _monthlyCallPlanRepository = monthlyCallPlanRepository;
        }

        public IQueryable<CallPlan> GetAll()
        {
            return _monthlyCallPlanRepository.All();
        }

        public CallPlan GetPlan(int managerId, int clientId, int month)
        {
            /*return GetAll().FirstOrDefault(x => x.ManagerId == managerId
                                     && x.ClientId == clientId
                                     && x.Date.Month == month);*/

            throw new Exception("Legacy");
        }

        public int GetPlanAmountCalls(int managerId, int clientId, int month)
        {
            return GetPlan(managerId, clientId, month)?.TotalCalls ?? 0;
        }

        public int GetPlanAmountCalls(int clientId, int month)
        {
            return GetAll().Where(x => x.ClientId == clientId
                                       && x.Date.Month == month)
                .Sum(x => x.TotalCalls);
        }


        public void Create(CallPlanCreate command)
        {
            /*_monthlyCallPlanRepository.Create(
                new CallPlan(
                    command.ManagerId,
                    command.ClientId,
                    command.TotalCalls,
                    command.Month));*/
            throw new Exception("Legacy");
        }
    }
}