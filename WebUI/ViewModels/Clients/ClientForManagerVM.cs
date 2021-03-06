﻿using System.Collections.Generic;
using Data.DTO.Calls;
using Data.DTO.WeeklyPlan;
using Data.Enums;

namespace WebUI.ViewModels.Clients
{
    public class ClientForManagerVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public string Phone { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }

        public ICollection<CallDTO> Calls { get; set; }
        public ICollection<WeekPlanDTO> WeekPlans { get; set; }
    }
}