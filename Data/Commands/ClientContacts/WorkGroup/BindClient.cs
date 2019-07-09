using Data.Entities.Clients;

namespace Data.Commands.ClientContacts.WorkGroup
{
    public class BindClient
    {
        public Client Client { get; set; }
        public int ClientId { get; set; }
        public int WorkGroupId { get; set; }
    }
}