using Data.Enums;

namespace Data.DTO.Clients
{
    public class WeekPlanDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string Plan { get; set; }
        public string Fact { get; set; }
        public string PlanTitle { get; set; }
        public string FactTitle { get; set; }
        public string DateTime { get; set; }
        public int WeekNumber { get; set; }
        public ManagerType ManagerType { get; set; }
    }
}