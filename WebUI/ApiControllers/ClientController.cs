﻿using System.Collections.Generic;
using Data.Entities.Clients;
using Data.Enums;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        // GET: api/Client
        /*[HttpGet]
        public IEnumerable<Client> Get()
        {
            var response = new List<Client>()
            {
                new Client()
                {
                    Id = 1,
                    Title = "Client1",
                    Phone = "555-35-35",
                    LegalEntity = "User",
                    ClientType = ClientTypes.Small,
                    NumberOfCalls = NumberOfCalls.FivePerMonth
                }
            };

            return response;
        }*/

        // GET: api/Client/5
        /*[HttpGet("{id}")]
        public Client Get(int id)
        {
            return new Client()
            {
                Id = 0,
                Title = "Client1",
                Phone = "555-35-35",
                LegalEntity = "User",
                ClientType = ClientTypes.Small,
                NumberOfCalls = NumberOfCalls.FivePerMonth
            };
        }*/

        // POST: api/Client
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Client/5
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
