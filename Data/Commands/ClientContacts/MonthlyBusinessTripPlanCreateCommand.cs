namespace Data.Commands.ClientContacts
{
    public class MonthlyBusinessTripPlanCreateCommand
    {
        public int ClientId { get; set; }
        public int AmountTrips { get; set; }
        public int Month { get; set; }
        public int ManagerId { get; set; }
    }
}
