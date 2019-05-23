using Data.Enums;

namespace Data.Commands.ClientContacts
{
    public class MonthlyBusinessTripPlanUpdateCommand
    {
        public int Id { get; set; }
        public BusinessTripCompletedType BusinessTripCompletedType { get; set; }
    }
}
