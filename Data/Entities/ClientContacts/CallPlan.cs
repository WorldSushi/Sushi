using System;
using Base;
using Data.Commands.ClientContacts.CallPlan;
using Data.Entities.Clients;

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

        private CallPlan()
        {

        }

        public CallPlan(CallPlanCreate command)
        {
            ClientId = command.ClientId;
            TotalCalls = command.TotalCalls;
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