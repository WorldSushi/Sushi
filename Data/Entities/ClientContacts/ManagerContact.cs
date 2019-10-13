﻿using Base;
using Data.Commands.ClientContacts.ClientContact;
using Data.Entities.Calls;
using Data.Entities.Users;
using Data.Enums;
using System;

namespace Data.Entities.ClientContacts
{
    public class ManagerContact : Entity
    {
        public Call Call { get; set; }
        public int ManagerCId { get; protected set; }
        public Manager ManagerC { get; protected set; }
        public int ManagerId { get; protected set; }
        public Manager Manager { get; protected set; }

        public DateTime Date { get; set; }

        public ClientContactType Type { get; set; }

        public ManagerType ManagerType { get; protected set; }
        public string Direction { get; set; }

        //public bool IsAccept { get; protected set; }

        protected ManagerContact()
        {

        }

        public ManagerContact(ClientContactCreate command)
        {
            ManagerCId = command.ClientId;
            Type = command.ContactType;
            ManagerId = command.ManagerId;
            ManagerType = command.ManagerType;
            //IsAccept = command.IsAccept;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        }
    }
}
