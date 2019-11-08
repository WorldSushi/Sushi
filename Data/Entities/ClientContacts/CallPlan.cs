using System;
using Base;
using Data.Commands.ClientContacts.CallPlan;
using Data.Entities.Clients;

namespace Data.Entities.ClientContacts
{
    public class CallPlan : Entity
    {
        public int ClientId { get; set; }
        public Client Client { get; set; }

        public int EscortManagerCalls { get; set; }
        public int RegionalManagerCalls { get; set; }
        public int TotalCalls { get; set; }

        public DateTime Date { get; set; }

        public CallPlan()
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