using System;
using Base;
using Data.Commands.ClientContacts.WeekPlan;
using Data.Entities.Clients;
using Data.Enums;

namespace Data.Entities.ClientContacts
{
    public class WeekPlan : Entity
    {
        public int ClientId { get; protected set; }
        public Client Client { get; protected set; }

        public DateTime Date { get; protected set; }

        public int WeekNumber { get; protected set; }

        public string Plan { get; protected set; }

        public string Fact { get; protected set; }

        public ManagerType ManagerType { get; protected set; }

        private WeekPlan()
        {

        }

        public WeekPlan(WeekPlanCreate command)
        {
            ClientId = command.ClientId;
            Plan = command.Plan;
            WeekNumber = command.WeekNumber;
            ManagerType = command.ManagerType;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
        }

        public void AddFact(string fact)
        {
            Fact = fact;
        }
    }
}