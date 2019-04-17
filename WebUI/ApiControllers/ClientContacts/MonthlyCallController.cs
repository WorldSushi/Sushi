using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.ApiControllers.ClientContacts
{
    [Route("api/[controller]")]
    [ApiController]
    public class MonthlyCallController : ControllerBase
    {
        private readonly IMonthlyCallService _monthlyCallService;

        public MonthlyCallController(IMonthlyCallService monthlyCallService)
        {
            _monthlyCallService = monthlyCallService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            //var a = _monthlyCallService.GetMonthlyCalls(1, 1, 4);

            return Ok();
        }
    }
}