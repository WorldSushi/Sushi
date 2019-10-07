using System;
using Base;
using Data.Entities.Clients;
using Data.Entities.Users;

namespace Data.Entities.Calls
{
    public class Call : Entity
    {
        public int ManagerId { get; set; }
        public Manager Manager { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public DateTime DateTime { get; set; }

        public int Duration { get; set; }

        public string Recording { get; set; }
        public string Direction { get; set; }
    }
}
