namespace Data.Commands.ClientContacts
{
    public class MonthlyCallPlanCreateCommand
    {
        public int ClientId { get; set; }
        public int AmountCalls { get; set; }
        public int Month { get; set; }
    }
}