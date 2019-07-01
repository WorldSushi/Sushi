using System.Collections.Generic;
using System.Threading.Tasks;
using Data;
using Data.DTO.Clients;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class ClientContactsResultController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ClientContactsResultController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = new List<ResultDto>()
            {
                new ResultDto()
                {
                    ClientId = 1,
                    EscortCalls = 30,
                    EscortMails = 2,
                    EscortWhatsUpMessages = 1,
                    RegionalCalls = 20,
                    RegionalMails = 1,
                    RegionalWhatsUpMessages = 0
                }
            };

            return Ok(result);
        }
    }
}