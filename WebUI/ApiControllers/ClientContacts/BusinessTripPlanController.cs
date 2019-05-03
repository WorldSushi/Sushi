using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Commands.ClientContacts;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.ClientContacts
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessTripPlanController : ControllerBase
    {
        private readonly IAccountInformationService _accountInformationService;
        private readonly IMonthlyBusinessTripService _monthlyBusinessTripService;

        public BusinessTripPlanController(IAccountInformationService accountInformationService,
            IMonthlyBusinessTripService monthlyBusinessTripService)
        {
            _accountInformationService = accountInformationService;
            _monthlyBusinessTripService = monthlyBusinessTripService;
        }

        // GET: api/BusinessTripPlan
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/BusinessTripPlan/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/BusinessTripPlan
        [HttpPost]
        public IActionResult Post([FromBody]MonthlyBusinessTripPlanCreateCommand value)
        {
            value.ManagerId = _accountInformationService.GetOperatorId();
            _monthlyBusinessTripService.Create(value);

            return Ok(new
            {
                clientId = value.ClientId,
                amountTrips= value.AmountTrips
            });
        }

        // PUT: api/BusinessTripPlan/5
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
