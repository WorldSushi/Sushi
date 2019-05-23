using System;
using System.Collections.Generic;
using System.Linq;
using Data;
using Data.Commands.Clients;
using Data.Entities.ClientContacts;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using WebUI.ViewModels.Clients;

namespace WebUI.ApiControllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientForAdminController : ControllerBase
    {
        private readonly IClientService _clientService;
        private readonly IMonthlyCallPlanService _monthlyCallPlanService;
        private readonly IMonthlyCallService _monthlyCallService;
        private readonly ApplicationContext _context;
        private readonly IMonthlyBusinessTripService _monthlyBusinessTripService;

        public ClientForAdminController(IClientService clientService,
            IMonthlyCallPlanService monthlyCallPlanService,
            IMonthlyCallService monthlyCallService,
            IMonthlyBusinessTripService monthlyBusinessTripService)
            IMonthlyCallService monthlyCallService,
            ApplicationContext context)
        {
            _clientService = clientService;
            _monthlyCallPlanService = monthlyCallPlanService;
            _monthlyCallService = monthlyCallService;
            _monthlyBusinessTripService = monthlyBusinessTripService;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<ClientForAdminVM> Get()
        {
            var calls = _monthlyCallService.GetMonthlyCalls(DateTime.Now.Month);
            var clients = _clientService.GetAll()
                .Select(x => new ClientForAdminVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    NumberOfShipments = x.NumberOfShipments,
                    PlannedAmountCalls = _monthlyCallPlanService
                        .GetPlanAmountCalls(x.Id, DateTime.Now.Month),
                    AmountCalls = calls.Count(c => c.Client_number == x.Phone),
                    Managers = new List<ClientManagersVM>()
                }).ToList();
            var weekPlans = _context.Set<WeekPlan>()
                .Select(z => new WeekPlanDto()
                {
                    Id = z.Id,
                    ManagerId = z.ManagerId,
                    ClientId = z.ClientId,
                    Date = z.Date,
                    WeekNumber = z.WeekNumber,
                    Plan = z.Plan,
                    Fact = z.Fact
                }).ToList();

            return clients
                .Select(x => new ClientForAdminVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    NumberOfShipments = x.NumberOfShipments,
                    PlannedAmountCalls = x.PlannedAmountCalls,
                    AmountCalls = x.AmountCalls,
                    Managers = _clientService.GetManagers(x.Id)
                        .Select(c => new ClientManagersVM()
                        {
                            Id = c.Id,
                            Login = c.Login,
                            AmountCalls = calls.Count(z => z.Client_number == x.Phone
                                                           && z.Src_number == c.Phone),
                            BusinessTripCompletedType = _monthlyBusinessTripService.GetPlan(x.Id, c.Id, DateTime.Now.Month)
                                .BusinessTripCompletedType,
                            PlannedAmountCalls = _monthlyCallPlanService
                                .GetPlanAmountCalls(c.Id, x.Id, DateTime.Now.Month),
                            PlannedAmountBusinessTrips = _monthlyBusinessTripService
                                .GetPlannedBusinessTripAmount(c.Id, x.Id, DateTime.Now.Month),
                            Calls = calls.Where(z => z.Client_number == x.Phone
                                                     && z.Src_number == c.Phone).ToList(),
                            WeekPlans = weekPlans
                                .Where(z => z.ManagerId == c.Id && z.ClientId == x.Id)
                                .ToList()
                        }).ToList()
                }).ToList();
        }

        // GET: api/ClientForAdmin/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ClientForAdmin
        [HttpPost]
        public IActionResult Post([FromBody]ClientCreateCommand command)
        {
            return Ok(_clientService.Create(command.Title, command.Phone, command.LegalEntity, command.ClientType, command.NumberOfCalls, command.NumberOfShipments));
        }

        // PUT: api/ClientForAdmin/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody]ClientEditCommand command)
        {
            _clientService.Edit(command);

            var calls = _monthlyCallService.GetMonthlyCalls(DateTime.Now.Month);
            var result = _clientService.GetAll()
                .Where(x => x.Id == command.Id)
                .Select(x => new ClientForAdminVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    NumberOfShipments = x.NumberOfShipments,
                    PlannedAmountCalls = _monthlyCallPlanService
                        .GetPlanAmountCalls(x.Id, DateTime.Now.Month),
                    AmountCalls = calls.Count(c => c.Client_number == x.Phone),
                    Managers = new List<ClientManagersVM>()
                }).ToList();

            
            var response = result.Select(x => new ClientForAdminVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    NumberOfShipments = x.NumberOfShipments,
                    PlannedAmountCalls = x.PlannedAmountCalls,
                    AmountCalls = x.AmountCalls,
                    Managers = _clientService.GetManagers(x.Id)
                        .Select(c => new ClientManagersVM()
                        {
                            Id = c.Id,
                            Login = c.Login,
                            AmountCalls = calls.Count(z => z.Client_number == x.Phone
                                                           && z.Src_number == c.Phone),
                            PlannedAmountCalls = _monthlyCallPlanService
                                .GetPlanAmountCalls(c.Id, x.Id, DateTime.Now.Month),
                            BusinessTripCompletedType = _monthlyBusinessTripService.GetPlan(x.Id, c.Id, DateTime.Now.Month)
                                .BusinessTripCompletedType,
                            PlannedAmountBusinessTrips = _monthlyBusinessTripService
                                .GetPlannedBusinessTripAmount(c.Id, x.Id, DateTime.Now.Month),
                            Calls = calls.Where(z => z.Client_number == x.Phone
                                                     && z.Src_number == c.Phone).ToList()
                        }).ToList()
                }).FirstOrDefault();

            return Ok(response);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _clientService.Delete(id);

            return Ok(id);
        }
    }
}
