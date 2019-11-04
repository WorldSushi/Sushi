using Base;

namespace Data.Entities.Calls
{
    public class PerformanceChart : Entity
    {
        public int ManagerId { get; set; }
        public int NumberPlan_DevelopmentCalls { get; set; }
        public int NumberPlan_YourShifts { get; set; }
        public int NumberPlan_SubstitutionShifts { get; set; }
        public int ShiftPlan_DevelopmentCalls { get; set; }
        public int ShiftPlan_YourShifts { get; set; }
        public int ShiftPlan_SubstitutionShifts { get; set; }
        public int Balls_DevelopmentCalls { get; set; }
        public int Balls_YourShifts { get; set; }
        public int Balls_SubstitutionShifts { get; set; }
    }
}