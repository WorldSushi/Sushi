using System;
using Base;
using Data.Entities.Clients;
using Data.Entities.Users;

namespace Data.Entities.ClientContacts
{
    public class MonthlyCallPlan : Entity
    {
        public int ManagerId { get; set; }
        public Manager Manager { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public int AmountCalls { get; set; }

        public DateTime Date { get; set; }

        public MonthlyCallPlan(int managerId, int clientId, int amountCalls, int month)
        {
            ManagerId = managerId;
            ClientId = clientId;
            AmountCalls = amountCalls;
            Date = new DateTime(DateTime.Now.Year, month, 1);
        }
    }
}