using Base;

namespace Data.Entities.Clients
{
    public class ClientGR : Entity
    {
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public string NameGr { get; set; }
    }
}