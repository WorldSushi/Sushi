using Base;
using System;

namespace Data.Entities.Clients
{
    public class ClientRevenue : Entity
    {
        public decimal Revenue { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public DateTime Date { get; set; }
    }
}
