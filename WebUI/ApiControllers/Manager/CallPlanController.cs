using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.CallPlan;
using Data.Constants;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class CallPlanController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public CallPlanController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var clients = await _context.Set<Client>()
                .Select(x => new
                {
                    Id = x.Id,
                    NumberOfCalls = x.NumberOfCalls
                })
                .ToListAsync();


            var clientsIdWithCallPlan = await _context.Set<CallPlan>()
                .Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => x.ClientId)
                .ToListAsync();

            var clientsWithoutCallPlan = clients.Select(x => x.Id)
                .Except(clientsIdWithCallPlan);

            if (clientsWithoutCallPlan.Any())
            {
                var callPlans = new List<CallPlan>();

                foreach (var clientId in clientsWithoutCallPlan)
                {
                    var client = clients.FirstOrDefault(x => x.Id == clientId);

                    callPlans.Add(new CallPlan(
                        new CallPlanCreate()
                        {
                            ClientId = clientId,
                            TotalCalls = NumberOfCallsToClient.CallsPerMonth(client.NumberOfCalls)
                        }));
                }

                await _context.Set<CallPlan>()
                    .AddRangeAsync(callPlans);

                await _context.SaveChangesAsync();
            }

            var clients1 = await _context.Set<Client>()
                .Select(x => new
                {
                    Id = x.Id,
                    TotalCalls = x.NumberOfCalls == NumberOfCalls.OnePerMonth ? 1 : x.NumberOfCalls == NumberOfCalls.OnePerTwoWeek ? 2 : x.NumberOfCalls == NumberOfCalls.ThreePerMonth ? 3
                    : x.NumberOfCalls == NumberOfCalls.OnePerWeek ? 4 : x.NumberOfCalls == NumberOfCalls.FivePerMonth ? 5 : x.NumberOfCalls == NumberOfCalls.SixPerMonth ? 6
                    : x.NumberOfCalls == NumberOfCalls.TwoPerWeek ? 8 : 0
                })
                .ToListAsync();

            var result = await _context.Set<CallPlan>()
                .Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => new CallPlanDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    TotalCalls = clients1.First(c => c.Id == x.ClientId).TotalCalls,
                    RegionalManagerCalls = clients1.First(c => c.Id == x.ClientId).TotalCalls - x.EscortManagerCalls,
                    EscortManagerCalls = x.EscortManagerCalls
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CallPlanCreate command)
        {
            var callPlan = await _context.Set<CallPlan>()
                .AddAsync(new CallPlan(command));


            await _context.SaveChangesAsync();

            return Ok(callPlan.Entity);
        }
    

        [HttpPut]
            public async Task<IActionResult> Put([FromBody] ChangeAmountEscortManagerCalls command)
            {
                var callPlan = await _context.Set<CallPlan>()
                    .FirstOrDefaultAsync(x => x.ClientId == command.ClientId
                                              && DateHelper.IsCurrentMonth(x.Date));

                callPlan.ChangeEscortManagerCalls(command.EscortManagerCalls);

                await _context.SaveChangesAsync();

                var result = callPlan;

                return Ok(result);
            }
        }
}