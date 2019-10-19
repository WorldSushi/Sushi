using System;
using Base;
using Data.Entities.Clients;

namespace Data.Entities.OneCInfo
{
    public class ClientInfo : Entity
    {
        public int ClientId { get; set; }

        public Guid OneCId { get; set; }

        public string Phone { get; set; }

        protected ClientInfo()
        {

        }

        public ClientInfo(int clientId, Guid oneCId, string phone)
        {
            ClientId = clientId;
            OneCId = oneCId;
        }
    }
}