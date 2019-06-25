using System;
using Base;
using Data.Commands.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.Users;
using Data.Enums;

namespace Data.Entities.ClientContacts
{
    public class BusinessTripPlan : Entity
    {
        public int ManagerId { get; set; }
        public Manager Manager { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public int NumberBusinessTripHours { get; set; }
        public BusinessTripCompletedType BusinessTripCompletedType { get; set; }

        public DateTime Date { get; set; }

        private BusinessTripPlan()
        {

        }

        public BusinessTripPlan(BusinessTripPlanCreateCommand command)
        {
            ManagerId = command.ManagerId;
            ClientId = command.ClientId;
            NumberBusinessTripHours = command.NumberBusinessTripHours;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            BusinessTripCompletedType = BusinessTripCompletedType.DidntCompleted;
        }
    }
}