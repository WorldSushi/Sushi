using Base;

namespace Data.Entities.Calls
{
    public class PerformanceChart : Entity
    {
        public int ManagerId { get; set; }
        public double NumberPlan_DevelopmentCalls { get; set; }
        public double NumberPlan_YourShifts { get; set; }
        public double NumberPlan_SubstitutionShifts { get; set; }
        public double ShiftPlan_DevelopmentCalls { get; set; }
        public double ShiftPlan_YourShifts { get; set; }
        public double ShiftPlan_SubstitutionShifts { get; set; }
        public double Balls_DevelopmentCalls { get; set; }
        public double Balls_YourShifts { get; set; }
        public double Balls_SubstitutionShifts { get; set; }
    }
}