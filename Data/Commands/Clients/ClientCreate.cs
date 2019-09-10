using Data.Entities.Clients;
using Data.Enums;
using System.Collections.Generic;

namespace Data.Commands.Clients
{
    public class ClientCreate
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public ICollection<ClientPhone> Phones { get; set; }
        public ClientTypes ClientType { get; set; }
        public ClientGroup Group { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }
    }
}
