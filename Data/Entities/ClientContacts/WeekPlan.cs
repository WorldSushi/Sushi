using System;
using Base;
using Data.Entities.Clients;
using Data.Entities.Users;

namespace Data.Entities.ClientContacts
{
    public class WeekPlan : Entity
    {
        public int ManagerId { get; set; }
        public Manager Manager { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public DateTime Date { get; set; }

        public int WeekNumber { get; set; }

        public string Plan { get; set; }

        public string Fact { get; set; }

        private WeekPlan()
        {

        }

        public WeekPlan(int managerId, int clientId, int month, int weekNumber, string plan)
        {
            ManagerId = managerId;
            ClientId = clientId;
            Plan = plan;
            WeekNumber = weekNumber;
            Date = new DateTime(DateTime.Now.Year, month, 1);
        }
    }
}