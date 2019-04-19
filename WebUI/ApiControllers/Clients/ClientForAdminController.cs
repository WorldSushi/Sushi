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
    public class ClientForAdminController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IMonthlyCallPlanService _monthlyCallPlanService;

        public ClientForAdminController(IClientService clientService,
            IMonthlyCallPlanService monthlyCallPlanService)
        {
            _clientService = clientService;
            _monthlyCallPlanService = monthlyCallPlanService;
        }

        [HttpGet]
        public IEnumerable<ClientForAdminVM> Get()
        {
            return _clientService.GetAll()
                .Select(x => new ClientForAdminVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    PlannedAmountCalls = _monthlyCallPlanService
                        .GetPlanAmountCalls(x.Id, DateTime.Now.Month)
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
        public void Post([FromBody] string value)
        {
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
