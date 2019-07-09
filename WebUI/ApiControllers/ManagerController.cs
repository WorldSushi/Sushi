using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Commands.Manager;
using Data.Entities.Users;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly IManagerService _managerService;

        public ManagerController(IManagerService managerService)
        {
            _managerService = managerService;
        }


        // GET: api/Manager
        [HttpGet]
        public IActionResult Get()
        {
            var response = _managerService.GetAll();

            return Ok(response.ToList());
        }

        // GET: api/Manager/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Manager
        /*[HttpPost]
        public IActionResult Post([FromBody]ManagerCreateCommand command)
        {
            return Ok(_managerService.Create(command.Login, command.Password, command.Phone));
        }*/

        // PUT: api/Manager/5
        /*[HttpPut("{id}")]
        public IActionResult Put([FromBody]ManagerEditCommand command)
        {
            return Ok(_managerService.Update(command));
        }*/

        // DELETE: api/Manager/5
        /*[HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _managerService.Delete(id);

            return Ok(id);
        }*/
    }
}
