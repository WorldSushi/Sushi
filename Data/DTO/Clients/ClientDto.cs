using Data.Enums;

namespace Data.DTO.Clients
{
    public class ClientDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public string Phone { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }

        public bool HasWorkgroup { get; set; }
    }
}