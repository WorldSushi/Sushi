using Data.Enums;

namespace Data.DTO.Clients
{
    public class BusinessTripPlanDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int Hours { get; set; }
        public BusinessTripCompletedType CompletedType { get; set; }
    }
}