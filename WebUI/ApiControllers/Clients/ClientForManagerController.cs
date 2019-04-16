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
    public class ClientForManagerController : ControllerBase
    {
        // GET: api/ClientForManager
        [HttpGet]
        public IEnumerable<ClientForManagerVM> Get()
        {
            return new List<ClientForManagerVM>()
            {
                new ClientForManagerVM()
                {
                    Id = 1,
                    Phone = "555-35-35",
                    PlannedAmountCalls = 3,
                    Title = "Client1"
                },
                new ClientForManagerVM()
                {
                    Id = 2,
                    Phone = "444-24-24",
                    PlannedAmountCalls = null,
                    Title = "Client2"
                }
            };
        }

        // GET: api/ClientForManager/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ClientForManager
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ClientForManager/5
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
