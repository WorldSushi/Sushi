using Base;
using Data.Commands.ClientContacts;
using Data.DTO.WeeklyPlan;
using Data.Entities.ClientContacts;
using Data.Services.Abstract.ClientContacts;
using System.Linq;

namespace Data.Services.Concrete.ClientContacts
{
    public class WeekPlanService : IWeekPlanService
    {
        private readonly IRepository<WeekPlan> _weekPlanRepository;

        public WeekPlanService(IRepository<WeekPlan> weekPlanRepository)
        {
            _weekPlanRepository = weekPlanRepository;
        }

        public IQueryable<WeekPlanDTO> GetWeekPlansByClient(int clientId, int month)
        {
            return _weekPlanRepository.All()
                .Where(x => x.ClientId == clientId
                            && x.Date.Month == month)
                .Select(x => new WeekPlanDTO {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    Fact = x.Fact,
                    Plan = x.Plan,
                    WeekNumber = x.WeekNumber                   
                }).AsQueryable();
        }

        public WeekPlan GetWeekPlan(int id)
        {
            return _weekPlanRepository.Get(id);
        }

        public void WeekPlanUpdate(WeekPlanDTO command)
        {
            var weekPlanEditing = GetWeekPlan(command.Id);

            weekPlanEditing.Plan = command.Plan;
            weekPlanEditing.Fact = command.Fact;

            _weekPlanRepository.Update(weekPlanEditing);
        }


        protected WeekPlan CreateWeekPlan(WeekPlanCreateCommand command)
        {
            return _weekPlanRepository.Create(
                new WeekPlan(
                    command.ManagerId,
                    command.ClientId,
                    command.Month,
                    command.WeekNumber,
                    command.Plan));
        }
    }
}
