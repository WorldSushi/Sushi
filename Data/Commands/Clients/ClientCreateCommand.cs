using Data.Enums;

namespace Data.Commands.Clients
{
    public class ClientCreateCommand
    {
        public string Title { get; set; }
        public string Phone { get; set; }
        public string LegalEntity { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public ShipmentPeriodicity ShipmentPeriodicity { get; set; }
    }
}
