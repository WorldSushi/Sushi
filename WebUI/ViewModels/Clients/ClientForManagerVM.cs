using System.Collections.Generic;
using Data.DTO.Calls;
using Data.Enums;

namespace WebUI.ViewModels.Clients
{
    public class ClientForManagerVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public string Phone { get; set; }
        public int? PlannedAmountCalls { get; set; }
        public int? PlannedAmountTrips { get; set; }
        public int AmountCalls { get; set; }
        public int BusinessTripPlanId { get; set; }
        public BusinessTripCompletedType BusinessTripCompletedType { get; set; }

        public ICollection<CallDTO> Calls { get; set; }

    }
}