using Data.DTO.Calls;
using System;
using System.Linq;

namespace Data.Services.Abstract
{
    public interface IMyCallsAPIService
    {
        CallsDTO GetCallsByDate(DateTime date);

        CallsDTO GetCallsByDateAndManager(DateTime date, int managerId);

    }
}
