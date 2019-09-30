using System.Collections.Generic;
using Base;
using Data.Commands.Clients;
using Data.Entities.ClientContacts;
using Data.Enums;

namespace Data.Entities.Clients
{
    public class Client : Entity
    {
        public string Title { get; protected set; }

        public string LegalEntity { get; protected set; }
        public string IsCoverage { get; set; }

        public ClientGroup Group { get; protected set; }

        public ClientTypes ClientType { get; protected set; }

        public NumberOfCalls NumberOfCalls { get; protected set; }

        public NumberOfShipments NumberOfShipments { get; protected set; }

        public ICollection<CallPlan> CallPlans { get; protected set; } = new HashSet<CallPlan>();

        public ICollection<BusinessTripPlan> BusinessTripPlans { get; protected set; } = new HashSet<BusinessTripPlan>();

        protected Client()
        {

        }

        public Client(ClientCreate command)
        {
            Title = command.Title;
            LegalEntity = command.LegalEntity;
            ClientType = command.ClientType;
            NumberOfCalls = command.NumberOfCalls;
            NumberOfShipments = command.NumberOfShipments;
            Group = command.Group;
        }

        public void Edit(ClientEdit command)
        {
            Title = command.Title;
            LegalEntity = command.LegalEntity;
            ClientType = command.ClientType;
            NumberOfCalls = command.NumberOfCalls;
            NumberOfShipments = command.NumberOfShipments;
            Group = command.Group;

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