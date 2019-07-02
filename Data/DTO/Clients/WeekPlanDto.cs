using Data.Enums;

namespace Data.DTO.Clients
{
    public class WeekPlanDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string Plan { get; set; }
        public string Fact { get; set; }
        public int WeekNumber { get; set; }
        public ManagerType ManagerType { get; set; }
    }
}