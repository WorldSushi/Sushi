using Data.Enums;

namespace Data.Commands.ClientContacts.BusinessTripPlan
{
    public class ChangeCompletedType
    {
        public int ClientId { get; set; }
        public BusinessTripCompletedType CompletedType { get; set; }    
    }
}