using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Commands.ClientContacts;
using Data.Entities.ClientContacts;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.ClientContacts
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonthlyCallPlanController : ControllerBase
    {
        private readonly IMonthlyCallPlanService _monthlyCallPlanService;
        private readonly IAccountInformationService _accountInformationService;

        public MonthlyCallPlanController(IMonthlyCallPlanService monthlyCallPlanService,
            IAccountInformationService accountInformationService)
        {
            _monthlyCallPlanService = monthlyCallPlanService;
            _accountInformationService = accountInformationService;
        }

        [HttpGet]
        public IEnumerable<MonthlyCallPlan> Get()
        {
            var response = new List<MonthlyCallPlan>()
            {
                new MonthlyCallPlan(1, 1, 10, 1)
            };

            return response;
        }

        // GET: api/MonthlyCallPlan/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/MonthlyCallPlan
        [HttpPost]
        public IActionResult Post([FromBody]MonthlyCallPlanCreateCommand command)
        {
            command.ManagerId = _accountInformationService.GetOperatorId();
            _monthlyCallPlanService.Create(command);

            return Ok(new
            {
                clientId = command.ClientId,
                amountCalls = command.AmountCalls
            });
        }

        // PUT: api/MonthlyCallPlan/5
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
