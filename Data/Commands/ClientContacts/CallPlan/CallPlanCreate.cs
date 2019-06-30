namespace Data.Commands.ClientContacts.CallPlan
{
    public class CallPlanCreate
    {
        public int ClientId { get; set; }
        public int TotalCalls { get; set; }
        public int EscortManagerId { get; set; }
        public int RegionalManagerId { get; set; }
    }
}