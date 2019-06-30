using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.ClientContacts.BusinessTripPlan;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class BusinessTripPlanController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public BusinessTripPlanController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Set<BusinessTripPlan>()
                .Select(x => new BusinessTripPlanDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    Hours = x.Hours,
                    CompletedType = x.CompletedType
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPut("ChangeHours")]
        public async Task<IActionResult> ChangeHours([FromBody] ChangeHours command)
        {
            var businessTripPlan = await _context.Set<BusinessTripPlan>()
                .FirstOrDefaultAsync(x => x.ClientId == command.ClientId
                                          && x.Date.Month == DateTime.Now.Month
                                          && x.Date.Year == DateTime.Now.Year);

            businessTripPlan.ChangeHours(command.Hours);

            await _context.SaveChangesAsync();

            var result = businessTripPlan;

            return Ok(result);
        }

        [HttpPut("ChangeCompletedType")]
        public async Task<IActionResult> ChangeCompletedType([FromBody] ChangeCompletedType command)
        {
            var businessTripPlan = await _context.Set<BusinessTripPlan>()
                .FirstOrDefaultAsync(x => x.ClientId == command.ClientId
                                          && x.Date.Month == DateTime.Now.Month
                                          && x.Date.Year == DateTime.Now.Year);

            businessTripPlan.ChangeCompletedType(command.CompletedType);

            await _context.SaveChangesAsync();

            var result = businessTripPlan;

            return Ok(result);
        }
    }
}