using Base;

namespace Data.Entities.Clients
{
    public class ClientPhone : Entity
    {
        public int ClientId { get; set; }
        public Client Client { get; set; }

        public string Phone { get; set; }
    }
}