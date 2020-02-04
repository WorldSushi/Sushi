using System;
using Base;
using Data.Commands.ClientContacts.WeekPlan;
using Data.Entities.Clients;
using Data.Enums;

namespace Data.Entities.ClientContacts
{
    public class WeekPlan : Entity
    {
        public int ClientId { get;  set; }
        public Client Client { get;  set; }

        public DateTime Date { get;  set; }

        public int WeekNumber { get;  set; }

        public string Plan { get;  set; }

        public string PlanTitle { get;  set; }

        public string Fact { get;  set; }

        public string FactTitle { get;  set; }

        public ManagerType ManagerType { get;  set; }

        public WeekPlan()
        {

        }

        public WeekPlan(WeekPlanCreate command)
        {
            ClientId = command.ClientId;
            Plan = command.Plan;
            WeekNumber = command.WeekNumber;
            ManagerType = command.ManagerType;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            PlanTitle = command.PlanTitle;
        }

        public void Edit(WeekPlanEdit command)
        {
            Plan = command.Plan;
            PlanTitle = command.PlanTitle;
        }

        public void AddFact(string fact, string factTitle)
        {
            FactTitle = factTitle;
            Fact = fact;
        }

        public void EditFact(WeekPlanFactEdit command)
        {
            Fact = command.Fact;
            FactTitle = command.FactTitle;
        }
    }
}