using System;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.BusinessTripPlan;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Enums;
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
                .Where(x => DateHelper.IsCurrentMonth(x.Date))
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
                                          && DateHelper.IsCurrentMonth(x.Date));

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
                                          && DateHelper.IsCurrentMonth(x.Date));

            businessTripPlan.ChangeCompletedType((BusinessTripCompletedType)command.CompletedType);

            await _context.SaveChangesAsync();

            var result = businessTripPlan;

            return Ok(result);
        }
    }
}