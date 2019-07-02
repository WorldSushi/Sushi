using System.Collections.Generic;
using Data.Enums;

namespace Data.DTO.Clients
{
    public class ClientForManagerDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public string Phone { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }
        public CallPlanDto CallPlan { get; set; }
        public BusinessTripPlanDto BusinessTripPlan { get; set; }
        public ICollection<WeekPlanDto> WeekPlans { get; set; }
        public ICollection<CallDto> Calls { get; set; }
        public ClientContactResultDto Results { get; set; }
    }
}