using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Commands.Clients;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.ViewModels.Clients;

namespace WebUI.ApiControllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientForAdminController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IMonthlyCallPlanService _monthlyCallPlanService;
        private readonly IMonthlyCallService _monthlyCallService;

        public ClientForAdminController(IClientService clientService,
            IMonthlyCallPlanService monthlyCallPlanService,
            IMonthlyCallService monthlyCallService)
        {
            _clientService = clientService;
            _monthlyCallPlanService = monthlyCallPlanService;
            _monthlyCallService = monthlyCallService;
        }

        [HttpGet]
        public IEnumerable<ClientForAdminVM> Get()
        {
            var calls = _monthlyCallService.GetMonthlyCalls(DateTime.Now.Month);
            var clients = _clientService.GetAll()
                .Select(x => new ClientForAdminVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    PlannedAmountCalls = _monthlyCallPlanService
                        .GetPlanAmountCalls(x.Id, DateTime.Now.Month),
                    AmountCalls = calls.Count(c => c.Client_number == x.Phone),
                    Managers = new List<ClientManagersVM>()
                }).ToList();

            return clients
                .Select(x => new ClientForAdminVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    PlannedAmountCalls = x.PlannedAmountCalls,
                    AmountCalls = x.AmountCalls,
                    Managers = _clientService.GetManagers(x.Id)
                        .Select(c => new ClientManagersVM()
                        {
                            Id = c.Id,
                            Login = c.Login,
                            AmountCalls = calls.Count(z => z.Client_number == x.Phone
                                                           && z.Src_number == c.Phone),
                            PlannedAmountCalls = _monthlyCallPlanService
                                .GetPlanAmountCalls(c.Id, x.Id, DateTime.Now.Month),
                            Calls = calls.Where(z => z.Client_number == x.Phone
                                                     && z.Src_number == c.Phone).ToList()
                        }).ToList()
                }).ToList();
        }

        // GET: api/ClientForAdmin/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ClientForAdmin
        [HttpPost]
        public IActionResult Post([FromBody]ClientCreateCommand command)
        {
            return Ok(_clientService.Create(command.Title, command.Phone));
        }

        // PUT: api/ClientForAdmin/5
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
