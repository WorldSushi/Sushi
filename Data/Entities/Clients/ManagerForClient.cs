using Base;
using Data.Commands.Clients;
using Data.Entities.Users;
using Data.Enums;

namespace Data.Entities.Clients
{
    public class ManagerForClient : Entity
    {
        public int ManagerId { get; protected set; }
        public Manager Manager { get; protected set; }

        public int ClientId { get; protected set; }
        public Client Client { get; protected set; }

        public ManagerType Type { get; protected set; }

        private ManagerForClient()
        {

        }

        public ManagerForClient(BindManager command)
        {
            ClientId = command.ClientId;
            ManagerId = command.ManagerId;
            Type = command.Type;
        }
    }
}