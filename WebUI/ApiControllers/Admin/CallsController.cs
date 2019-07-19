using System.Threading.Tasks;
using Data;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.ApiControllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public CallsController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //var result = await _context.Set<Call>()

            return Ok();
        }
    }
}