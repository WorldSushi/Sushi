using Base;

namespace Data.Entities.Clients
{
    public class ClientResumeWeek : Entity
    {
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public string Resume { get; set; }
        public string Date { get; set; }
    }
}