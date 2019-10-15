using Base;
using Data.Commands.ClientContacts.ClientContact;
using Data.Enums;
using System;

namespace Data.Entities.ClientContacts
{
    public class ContactManager : Entity
    {
        public int CallId { get; set; }
        public int ManagerIdC { get; protected set; }
        public int ManagerId { get; protected set; }
        public DateTime Date { get; set; }

        public ClientContactType Type { get; set; }

        public ManagerType ManagerType { get; protected set; }
        public string Direction { get; set; }

        protected ContactManager()
        {

        }

        public ContactManager(ClientContactCreate command)
        {
            ManagerIdC = command.ClientId;
            Type = command.ContactType;
            ManagerId = command.ManagerId;
            ManagerType = command.ManagerType;
            //IsAccept = command.IsAccept;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        }
    }
}
