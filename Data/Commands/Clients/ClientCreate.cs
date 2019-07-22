using Data.Enums;

namespace Data.Commands.Clients
{
    public class ClientCreate
    {
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }
    }
}
