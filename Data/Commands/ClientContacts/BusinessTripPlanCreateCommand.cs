namespace Data.Commands.ClientContacts
{
    public class BusinessTripPlanCreateCommand
    {
        public int ClientId { get; set; }
        public int NumberBusinessTripHours { get; set; }
        public int ManagerId { get; set; }
    }
}
