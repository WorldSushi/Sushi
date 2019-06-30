using Data.Enums;

namespace Data.DTO.Clients
{
    public class WeekPlanDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int WeekNumber { get; set; }
        public ManagerType ManagerType { get; set; }
    }
}