using System;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.CallPlan;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class CallPlanController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public CallPlanController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Set<CallPlan>()
                .Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => new CallPlanDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    TotalCalls = x.TotalCalls,
                    EscortManagerCalls = x.EscortManagerCalls,
                    RegionalManagerCalls = x.RegionalManagerCalls
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ChangeAmountEscortManagerCalls command)
        {
            var callPlan = await _context.Set<CallPlan>()
                .FirstOrDefaultAsync(x => x.ClientId == command.ClientId
                                          && DateHelper.IsCurrentMonth(x.Date));

            callPlan.ChangeEscortManagerCalls(command.Amount);

            await _context.SaveChangesAsync();

            var result = callPlan;

            return Ok(result);
        }
    }
}