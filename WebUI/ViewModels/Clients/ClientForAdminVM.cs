using System;
using System.Collections.Generic;
using Data.DTO.Calls;
using Data.Enums;

namespace WebUI.ViewModels.Clients
{
    public class ClientForAdminVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public string Phone { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }
        public int? PlannedAmountCalls { get; set; }
        public int? PlannedAmountTrips { get; set; }
        public int AmountCalls { get; set; }
        public ICollection<ClientManagersVM> Managers { get; set; }
    }

    public class ClientManagersVM
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public int AmountCalls { get; set; }
        public int? PlannedAmountCalls { get; set; }
        public ICollection<CallDTO> Calls { get; set; }
        public BusinessTripCompletedType BusinessTripCompletedType { get; set; }
        public int? PlannedAmountBusinessTrips { get; set; }
        public ICollection<WeekPlanDto> WeekPlans { get; set; }
    }

    public class WeekPlanDto
    {
        public int Id { get; set; }
        public int ManagerId { get; set; }
        public int ClientId { get; set; }
        public DateTime Date { get; set; }
        public int WeekNumber { get; set; }
        public string Plan { get; set; }
        public string Fact { get; set; }
    }
}