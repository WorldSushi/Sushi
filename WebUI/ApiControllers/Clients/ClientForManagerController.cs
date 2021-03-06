﻿using System;
using System.Collections.Generic;
using System.Linq;
using Data.DTO.Calls;
using Data.DTO.WeeklyPlan;
using Data.Services.Abstract;
using Data.Services.Abstract.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using WebUI.Services.Abstract;
using WebUI.ViewModels.Clients;

namespace WebUI.ApiControllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientForManagerController : ControllerBase
    {
        private readonly IMonthlyCallService _monthlyCallService;
        private readonly IManagerService _managerService;
        private readonly IMonthlyCallPlanService _monthlyCallPlanService;
        private readonly IAccountInformationService _accountInformationService;
        private readonly IMonthlyBusinessTripService _monthlyBusinessTripService;
        private readonly IWeekPlanService _weekPlanService;

        public ClientForManagerController(IMonthlyCallService monthlyCallService,
            IManagerService managerService,
            IMonthlyCallPlanService monthlyCallPlanService,
            IAccountInformationService accountInformationService,
            IMonthlyBusinessTripService monthlyBusinessTripService,
            IWeekPlanService weekPlanService)
        {
            _monthlyCallService = monthlyCallService;
            _managerService = managerService;
            _monthlyCallPlanService = monthlyCallPlanService;
            _accountInformationService = accountInformationService;
            _monthlyBusinessTripService = monthlyBusinessTripService;
            _weekPlanService = weekPlanService;
        }

       /* [HttpGet]
        public IEnumerable<ClientForManagerVM> Get()
        {
            var calls = new List<CallDTO>();//_monthlyCallService.GetMonthlyCalls(DateTime.Now.Month).ToList();
            var trips = _monthlyBusinessTripService.GetAll().ToList();
            var manager = _managerService.Get(_accountInformationService.GetOperatorId());

            var test = _managerService.GetClients(manager.Id)
                .Select(x => new ClientForManagerVM()
                {
                    Id = x.Id,
                    Phone = x.Phone,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    ClientType = x.ClientType,
                    NumberOfCalls = x.NumberOfCalls,
                    NumberOfShipments = x.NumberOfShipments
                }).ToList();

            return test;
        }*/

        // GET: api/ClientForManager/5
        [HttpGet("{id}")]
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
