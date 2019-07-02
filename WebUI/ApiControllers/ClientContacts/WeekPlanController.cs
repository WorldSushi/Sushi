using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Commands.ClientContacts;
using Data.DTO.WeeklyPlan;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.ClientContacts
{
 
    [Route("api/[controller]")]
    [ApiController]
    public class WeekPlanController : ControllerBase
    {
        private readonly IWeekPlanService _weekPlanService;
        private readonly IAccountInformationService _accountInformationService;

        public WeekPlanController(IWeekPlanService weekPlanService,
            IAccountInformationService accountInformationService)
        {
            _weekPlanService = weekPlanService;
            _accountInformationService = accountInformationService;
        }

        // GET: api/WeekPlan
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/WeekPlan/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/WeekPlan
       /* [HttpPost]
        public IActionResult Post([FromBody] ICollection<WeekPlanDTO> value)
        {
            var manager = _accountInformationService.GetOperatorId();

            foreach(var weekPlan in value)
            {
                _weekPlanService.CreateWeekPlan(new WeekPlanCreateCommand
                {
                    ClientId = weekPlan.ClientId,
                    ManagerId = manager,
                    Month = DateTime.Now.Month,
                    Plan = weekPlan.Plan,
                    WeekNumber = weekPlan.WeekNumber
                });
            }

            return Ok(_weekPlanService.GetWeekPlansByClient(value.FirstOrDefault().ClientId, manager, DateTime.Now.Month));
        }*/

        // PUT: api/WeekPlan/5
        /*[HttpPut()]
        public IActionResult Put([FromBody] ICollection<WeekPlanDTO> value)
        {
            var manager = _accountInformationService.GetOperatorId();

            foreach (var weekPlan in value)
            {
                _weekPlanService.WeekPlanUpdate(weekPlan);               
            }

            return Ok(_weekPlanService.GetWeekPlansByClient(value.FirstOrDefault().ClientId, manager, DateTime.Now.Month));
        }*/

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
