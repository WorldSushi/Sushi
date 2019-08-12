using Data.DTO.Clients;
using Data.Enums;
using System.Collections.Generic;

namespace Data.Commands.Clients
{
    public class ClientEdit
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public ICollection<ClientPhoneDTO> Phones { get; set; }
        
        public ClientGroup Group { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }
    }
}
