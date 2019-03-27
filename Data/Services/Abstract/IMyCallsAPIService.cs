using Data.DTO.Calls;
using System;
using System.Linq;

namespace Data.Services.Abstract
{
    public interface IMyCallsAPIService
    {
        DateTime GetReferencePoint();

        CallsDTO GetCallsByDate(DateTime dateFrom, int results_next_offset);

        CallsDTO GetCallsByDate(DateTime dateFrom, DateTime dateFor, int results_next_offset);

        CallsDTO GetCallsByDateAndManager(DateTime dateFrom, int managerId);

        CallsDTO GetCallsByDateAndManager(DateTime dateFrom, DateTime dateFor, int managerId);

    }
}
