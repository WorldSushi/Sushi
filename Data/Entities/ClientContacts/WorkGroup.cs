using Base;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Entities.Clients;
using Data.Entities.Users;

namespace Data.Entities.ClientContacts
{
    public class WorkGroup : Entity
    {
        public int EscortManagerId { get; protected set; }
        public Manager EscortManager { get; protected set; }

        public int RegionalManagerId { get; protected set; }
        public Manager RegionalManager { get; protected set; }

        public int ClientId { get; protected set; }
        public Client Client { get; protected set; }

        protected WorkGroup()
        {

        }

        public WorkGroup(WorkGroupCreate command)
        {
            ClientId = command.ClientId;
            RegionalManagerId = command.RegionalManagerId;
            EscortManagerId = command.EscortManagerId;
        }

        public void ChangeEscortManager(int escortManagerId)
        {
            EscortManagerId = escortManagerId;
        }

        public void ChangeRegionalManager(int regionalManagerId)
        {
            RegionalManagerId = regionalManagerId;
        }
    }
}