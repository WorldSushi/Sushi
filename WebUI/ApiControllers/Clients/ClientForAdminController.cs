using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.ViewModels.Clients;

namespace WebUI.ApiControllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientForAdminController : ControllerBase
    {
        // GET: api/ClientForAdmin
        [HttpGet]
        public IEnumerable<ClientForAdminVM> Get()
        {
            return new List<ClientForAdminVM>()
            {
                new ClientForAdminVM()
                {
                    Id = 1,
                    Phone = "555-35-35",
                    PlannedAmountCalls = 10,
                    Title = "Client1"
                },
                new ClientForAdminVM()
                {
                    Id = 2,
                    Phone = "444-24-24",
                    Title = "Client2",
                    PlannedAmountCalls = null
                }
            };
        }

        // GET: api/ClientForAdmin/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ClientForAdmin
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ClientForAdmin/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
