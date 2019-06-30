using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.ClientContacts;
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
                                          && x.Date.Month == DateTime.Now.Month
                                          && x.Date.Year == DateTime.Now.Year);

            callPlan.ChangeEscortManagerCalls(command.Amount);

            await _context.SaveChangesAsync();

            var result = callPlan;

            return Ok(result);
        }
    }
}