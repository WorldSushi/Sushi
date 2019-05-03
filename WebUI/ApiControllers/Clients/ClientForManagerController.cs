using System;
using System.Collections.Generic;
using System.Linq;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using WebUI.Services.Abstract;
using WebUI.ViewModels.Clients;

namespace WebUI.ApiControllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientForManagerController : ControllerBase
    {
        private readonly IMonthlyCallService _monthlyCallService;
        private readonly IManagerService _managerService;
        private readonly IMonthlyCallPlanService _monthlyCallPlanService;
        private readonly IAccountInformationService _accountInformationService;
        private readonly IMonthlyBusinessTripService _monthlyBusinessTripService;

        public ClientForManagerController(IMonthlyCallService monthlyCallService,
            IManagerService managerService,
            IMonthlyCallPlanService monthlyCallPlanService,
            IAccountInformationService accountInformationService,
            IMonthlyBusinessTripService monthlyBusinessTripService)
        {
            _monthlyCallService = monthlyCallService;
            _managerService = managerService;
            _monthlyCallPlanService = monthlyCallPlanService;
            _accountInformationService = accountInformationService;
            _monthlyBusinessTripService = monthlyBusinessTripService;
        }

        [HttpGet]
        public IEnumerable<ClientForManagerVM> Get()
        {
            var calls = _monthlyCallService.GetMonthlyCalls(DateTime.Now.Month).ToList();
            var trips = _monthlyBusinessTripService.GetAll().ToList();
            var manager = _managerService.Get(_accountInformationService.GetOperatorId());

            var test = _managerService.GetClients(manager.Id)
                .Select(x => new ClientForManagerVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    AmountCalls = calls.Count(c => c.Client_number == x.Phone
                                                   && c.Src_number == manager.Phone),
                    AmountTrips = 0,
                    PlannedAmountCalls = _monthlyCallPlanService
                        .GetPlanAmountCalls(manager.Id, x.Id, DateTime.Now.Month),
                    Calls = calls.Where(c => c.Client_number == x.Phone
                                             && c.Src_number == manager.Phone).ToList(),
                    PlannedAmountTrips = _monthlyBusinessTripService
                       .GetPlannedBusinessTripAmount(manager.Id, x.Id, DateTime.Now.Month),
                }).ToList();

            return test;
        }

        // GET: api/ClientForManager/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ClientForManager
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ClientForManager/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
