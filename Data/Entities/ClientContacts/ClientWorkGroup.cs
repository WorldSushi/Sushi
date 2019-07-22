using Base;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Entities.Clients;

namespace Data.Entities.ClientContacts
{
    public class ClientWorkGroup : Entity
    {
        public int WorkGroupId { get; protected set; }
        public WorkGroup WorkGroup { get; protected set; }

        public int ClientId { get; protected set; }
        public Client Client { get; protected set; }

        protected ClientWorkGroup()
        {

        }

        public ClientWorkGroup(BindClient command)
        {
            WorkGroupId = command.WorkgroupId;
            ClientId = command.ClientId;
        }
    }
}