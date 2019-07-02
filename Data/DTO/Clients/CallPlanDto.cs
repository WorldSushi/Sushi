namespace Data.DTO.Clients
{
    public class CallPlanDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int TotalCalls { get; set; }
        public int EscortManagerCalls { get; set; }
        public int RegionalManagerCalls { get; set; }
    }
}