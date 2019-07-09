using Data.Enums;

namespace Data.Commands.ClientContacts.WeekPlan
{
    public class WeekPlanCreate
    {
        public int ClientId { get; set; }
        public int WeekNumber { get; set; }
        public string Plan { get; set; }
        public string PlanTitle { get; set; }
        public ManagerType ManagerType { get; set; }
    }
}
