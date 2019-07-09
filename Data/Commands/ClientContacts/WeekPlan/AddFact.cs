using Data.Enums;

namespace Data.Commands.ClientContacts.WeekPlan
{
    public class AddFact
    {
        public int ClientId { get; set; }
        public ManagerType ManagerType { get; set; }
        public string Fact { get; set; }
        public string FactTitle { get; set; }
        public int WeekNumber { get; set; }
    }
}