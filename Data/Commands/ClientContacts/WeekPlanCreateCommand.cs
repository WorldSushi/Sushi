namespace Data.Commands.ClientContacts
{
    public class WeekPlanCreateCommand
    {
        public int ClientId { get; set; }
        public int ManagerId { get; set; }
        public int WeekNumber { get; set; }
        public int Month { get; set; }
        public string Plan { get; set; }
    }
}
