using System.Collections.Generic;
using Base;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Entities.Users;

namespace Data.Entities.ClientContacts
{
    public class WorkGroup : Entity
    {
        public string Title { get; protected set; }

        public int? EscortManagerId { get; protected set; }
        public Manager EscortManager { get; protected set; }

        public int? RegionalManagerId { get; protected set; }
        public Manager RegionalManager { get; protected set; }

        public ICollection<ClientWorkGroup> Clients { get; protected set; } = new HashSet<ClientWorkGroup>(); 

        protected WorkGroup()
        {

        }

        public WorkGroup(WorkGroupCreate command)
        {
            Title = command.Title;

            if(command.RegionalManagerId != null || command.RegionalManagerId != 0)
                RegionalManagerId = command.RegionalManagerId;

            if(command.EscortManagerId != null || command.RegionalManagerId != 0)
                EscortManagerId = command.EscortManagerId;
        }

        public void BindClient(BindClient command)
        {
            Clients.Add(new ClientWorkGroup(command));
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