using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Base;
using Data.Commands.ClientContacts.ClientContact;
using Data.Entities.Calls;
using Data.Entities.Clients;
using Data.Entities.Users;
using Data.Enums;

namespace Data.Entities.ClientContacts
{
    public class ClientContact : Entity
    {
        [ForeignKey("Call")]
        public int CallId { get; set; }
        public Call Call { get; set; }
        public int ClientId { get; protected set; }
        public int ManagerId { get; protected set; }
        public Manager Manager { get; protected set; }

        public DateTime Date { get; set; }

        public ClientContactType Type { get; set; }

        public ManagerType ManagerType { get; protected set; }
        public string Direction { get; set; }

        //public bool IsAccept { get; protected set; }

        protected ClientContact()
        {

        }

        public ClientContact(ClientContactCreate command)
        {
            ClientId = command.ClientId;
            Type = command.ContactType;
            ManagerId = command.ManagerId;
            ManagerType = command.ManagerType;
            //IsAccept = command.IsAccept;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        }
    }
}