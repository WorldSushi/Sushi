using System;
using Base;
using Data.Commands.ClientContacts.BusinessTripPlan;
using Data.Entities.Clients;
using Data.Enums;

namespace Data.Entities.ClientContacts
{
    public class BusinessTripPlan : Entity
    {
        public int ClientId { get; protected set; }
        public Client Client { get; protected set; }

        public int Hours { get; protected set; }
        public BusinessTripCompletedType CompletedType { get; protected set; }

        public DateTime Date { get; protected set; }

        private BusinessTripPlan()
        {

        }

        public BusinessTripPlan(BusinessTripPlanCreate command)
        {
            ClientId = command.ClientId;
            Hours = command.NumberBusinessTripHours;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);

            CompletedType = BusinessTripCompletedType.DidntCompleted;
        }

        public void ChangeHours(int hours)
        {
            Hours = hours;
        }

        public void ChangeCompletedType(BusinessTripCompletedType type)
        {
            CompletedType = type;
        }
    }
}