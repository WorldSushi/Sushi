﻿using Data.Commands.ClientContacts;
using Data.Entities.ClientContacts;
using Data.Enums;
using System.Linq;

namespace Data.Services.Abstract.ClientContacts
{
    public interface IMonthlyBusinessTripService
    {
        IQueryable<MonthlyBusinessTripPlan> GetAll();
        MonthlyBusinessTripPlan GetPlan(int managerId, int clientId, int month);
        int GetPlannedBusinessTripAmount(int managerId, int clientId, int month);

        BusinessTripCompletedType GetPlanCompletedType(int managerId, int clientId, int month);
        int GetPlanAmountTrips(int clientId, int month);

        MonthlyBusinessTripPlan Create(MonthlyBusinessTripPlanCreateCommand command);
        MonthlyBusinessTripPlan Update(MonthlyBusinessTripPlanUpdateCommand command);
    }
}