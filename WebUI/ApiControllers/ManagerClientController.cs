using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Commands.Clients;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ManagerClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        // POST: api/ManagerClient
        [HttpPost]
        public IActionResult Post([FromBody]BindManagerCommand command)
        {
            _clientService.BindManager(command);

            return Ok();
        }
    }
}