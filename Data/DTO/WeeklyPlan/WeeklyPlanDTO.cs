using System;
using Data.Enums;

namespace Data.DTO.WeeklyPlan
{
    public class WeekPlanDTO
    {
        public int Id { get; set; }
        public int ManagerId { get; set; }
        public int ClientId { get; set; }
        public DateTime Date { get; set; }
        public int WeekNumber { get; set; }
        public string Plan { get; set; }
        public string Fact { get; set; }
        public ManagerType ManagerType { get; set; }
    }
}
