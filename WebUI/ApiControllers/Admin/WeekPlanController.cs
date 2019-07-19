using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class WeekPlanController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public WeekPlanController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Set<WeekPlan>()
                .Select(x => new WeekPlanDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    Plan = x.Plan,
                    Fact = x.Fact,
                    WeekNumber = x.WeekNumber,
                    ManagerType = x.ManagerType
                }).ToListAsync();

            return Ok(result);
        }
    }
}