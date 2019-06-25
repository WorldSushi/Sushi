using System;
using Base;
using Data.Commands.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.Users;

namespace Data.Entities.ClientContacts
{
    public class CallPlan : Entity
    {
        public int ClientId { get; protected set; }
        public Client Client { get; protected set; }

        public int EscortManagerCalls { get; protected set; }
        public int RegionalManagerCalls { get; protected set; }
        public int TotalCalls { get; protected set; }

        public DateTime Date { get; protected set; }

        public int EscortManagerId { get; protected set; }
        public Manager EscortManager { get; protected set; }

        public int RegionalManagerId { get; protected set; }
        public Manager RegionalManager { get; protected set; }

        private CallPlan()
        {

        }

        public CallPlan(CallPlanCreateCommand command)
        {
            ClientId = command.ClientId;
            TotalCalls = command.TotalCalls;
            EscortManagerId = command.EscortManagerId;
            RegionalManagerId = command.RegionalManagerId;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            EscortManagerCalls = 0;
            RegionalManagerCalls = TotalCalls;
        }

        public void ChangeEscortManagerCalls(int amount)
        {
            EscortManagerCalls = amount;
            RegionalManagerCalls = TotalCalls - EscortManagerCalls;
        }
    }
}