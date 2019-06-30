using System;
using System.Collections.Generic;
using System.Linq;
using Base;
using Data.Commands.ClientContacts;
using Data.Commands.Clients;
using Data.Constants;
using Data.Entities.ClientContacts;
using Data.Enums;

namespace Data.Entities.Clients
{
    public class Client : Entity
    {
        public string Title { get; protected set; }

        public string Phone { get; protected set; }

        public string LegalEntity { get; protected set; }

        public ClientTypes ClientType { get; protected set; }

        public NumberOfCalls NumberOfCalls { get; protected set; }

        public NumberOfShipments NumberOfShipments { get; protected set; }

        public ICollection<ManagerForClient> Managers { get; protected set; } = new HashSet<ManagerForClient>();

        public ICollection<CallPlan> CallPlans { get; protected set; } = new HashSet<CallPlan>();

        public ICollection<BusinessTripPlan> BusinessTripPlans { get; protected set; } = new HashSet<BusinessTripPlan>();

        protected Client()
        {

        }

        public Client(ClientCreateCommand command)
        {
            Title = command.Title;
            Phone = command.Phone;
            LegalEntity = command.LegalEntity;
            ClientType = command.ClientType;
            NumberOfCalls = command.NumberOfCalls;
            NumberOfShipments = command.NumberOfShipments;
        }

        public void Edit(ClientEditCommand command)
        {
            Title = command.Title;
            LegalEntity = command.LegalEntity;
            Phone = command.Phone;
            ClientType = command.ClientType;
            NumberOfCalls = command.NumberOfCalls;
            NumberOfShipments = command.NumberOfShipments;
        }

        public void BindManager(BindManagerCommand command)
        {
            Managers.Add(new ManagerForClient(command));
        }

       /* public CallPlan CurrentCallPlan()
        {
            var currentDate = DateTime.Now;

            var callPlan = CallPlans.FirstOrDefault(x => x.Date.Month == currentDate.Month
                                                         && x.Date.Year == currentDate.Year);

            if (callPlan != null)
                return callPlan;

            callPlan = new CallPlan(
                new CallPlanCreateCommand()
                {
                    ClientId = Id,
                    RegionalManagerId = Managers
                        .FirstOrDefault(x => x.Type == ManagerType.RegionalManager)?.Id ?? 0,
                    EscortManagerId = Managers
                        .FirstOrDefault(x => x.Type == ManagerType.EscortManager)?.Id ?? 0,
                    TotalCalls = NumberOfCallsToClient.CallsPerMonth(NumberOfCalls)
                });

            CallPlans.Add(callPlan);

            return callPlan;
        }

        public BusinessTripPlan CurrentBusinessTripPlan()
        {
            var currentDate = DateTime.Now;

            var businessTripPlan = BusinessTripPlans.FirstOrDefault(x => x.Date.Year == currentDate.Year
                                                                         && x.Date.Month == currentDate.Month);

            if (businessTripPlan != null)
                return businessTripPlan;

            businessTripPlan = new BusinessTripPlan(
                new BusinessTripPlanCreateCommand()
                {
                    ClientId = Id,
                    ManagerId = Managers
                                    .FirstOrDefault(x => x.Type == ManagerType.RegionalManager)?.Id
                                ?? throw new Exception("У клиента нету регионального менеджера"),
                    NumberBusinessTripHours = 0
                });

            BusinessTripPlans.Add(businessTripPlan);

            return businessTripPlan;
        }*/
    }
}