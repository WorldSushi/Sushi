using Base;
using Data.Entities.Users;

namespace Data.Entities.Clients
{
    public class ManagerForClient : Entity
    {
        public int ManagerId { get; set; }
        public Manager Manager { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        private ManagerForClient()
        {

        }

        public ManagerForClient(int clientId, int managerId)
        {
            ClientId = clientId;
            ManagerId = managerId;
        }
    }
}