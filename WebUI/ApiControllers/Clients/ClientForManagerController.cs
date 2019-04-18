using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.ViewModels.Clients;

namespace WebUI.ApiControllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientForManagerController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IMonthlyCallService _monthlyCallService;
        private readonly IManagerService _managerService;
        private readonly IMonthlyCallPlanService _monthlyCallPlanService;

        public ClientForManagerController(IClientService clientService,
            IMonthlyCallService monthlyCallService,
            IManagerService managerService,
            IMonthlyCallPlanService monthlyCallPlanService)
        {
            _clientService = clientService;
            _monthlyCallService = monthlyCallService;
            _managerService = managerService;
            _monthlyCallPlanService = monthlyCallPlanService;
        }

        [HttpGet]
        public IEnumerable<ClientForManagerVM> Get()
        {
            var calls = _monthlyCallService.GetMonthlyCalls(4);
            var manager = _managerService.Get(1);

            return _clientService.GetAll()
                .Select(x => new ClientForManagerVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    AmountCalls = calls.Count(c => c.Client_number == x.Phone
                                                   && c.Src_number == manager.Phone),
                    PlannedAmountCalls = _monthlyCallPlanService
                        .GetPlanAmountCalls(manager.Id, x.Id, DateTime.Now.Month),
                    Calls = calls.Where(c => c.Client_number == x.Phone
                                             && c.Src_number == manager.Phone).ToList()
                }).ToList();
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
