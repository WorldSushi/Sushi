﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Base.Extensions;
using Data.DTO.Calls;
using Data.DTO.Users;
using Data.Entities.Users;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebUI.Options;
using WebUI.ViewModels.Managers;

namespace WebUI.Controllers.Users
{
    [Authorize]
    public class ManagerController : Controller
    {
        private readonly IManagerService _managerService;
        private readonly IClientService _clientService;
        private readonly IMyCallsAPIService _myCallsApiService;

        public ManagerController(IManagerService managerService,
            IClientService clientService,
            IMyCallsAPIService myCallsApiService)
        {
            _managerService = managerService;
            _myCallsApiService = myCallsApiService;
            _clientService = clientService;
        }

        public IActionResult Index()
        {
            var response = _managerService.GetAll()
                .Select(x => new ManagerDto
                {
                    Id = x.Id,
                    Login = x.Login,
                    Password = x.Password,
                    Phone = x.Phone
                });

            return View(response);
        }

        /*public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string login, string password, string phone)
        {
            _managerService.Create(login, password, phone);

            return RedirectToAction("Index");
        }*/

        public IActionResult Detail(int id)
        {
            var manager = _managerService.Get(id);

            var response = new ManagerDetailVM
            {
                Id = manager.Id,               
                Login = manager.Login,
                Password = manager.Password,
                Phone = manager.Phone
            };

            return View(response);
        }

        /*[HttpPost]
        public IActionResult GetCalls([FromBody]GetCallsOptions options)
        {
            if (options.DateFrom != null && options.DateFor != null)
            {
                var dateFrom = DateTime.ParseExact(options.DateFrom, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                var dateFor = DateTime.ParseExact(options.DateFor, "dd.MM.yyyy", CultureInfo.InvariantCulture);

                var response = _myCallsApiService.GetCallsByDateAndManager(dateFrom, dateFor, options.ManagerId)
                    .Results
                    .Select(x => new CallVM
                    {
                        Date = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(x.Start_time).AddHours(3).ToString("dd.MM.yyyy HH:ss"),
                        Duration = TimeSpan.FromSeconds(x.Duration).ToString(@"mm\:ss"),
                        Recording = x.Recording,
                        ClientTitle = _clientService.GetClientByPhone(x.Src_number)?.Title ?? "",
                        Src_Number = x.Src_number.PhoneFormat()
                    });

                return Ok(response);
            }
            else if (options.DateFrom != null && options.DateFor == null)
            {
                var dateFrom = DateTime.ParseExact(options.DateFrom, "dd.MM.yyyy", CultureInfo.InvariantCulture);
                var dateFor = DateTime.Now.AddDays(1);

                var response = _myCallsApiService.GetCallsByDateAndManager(dateFrom, dateFor, options.ManagerId)
                    .Results
                    .Select(x => new CallVM
                    {
                        Date = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(x.Start_time).AddHours(3).ToShortTimeString(),
                        Duration = TimeSpan.FromSeconds(x.Duration).ToString(@"mm\:ss"),
                        Recording = x.Recording,
                        ClientTitle = _clientService.GetClientByPhone(x.Src_number)?.Title ?? "",
                        Src_Number = x.Src_number.PhoneFormat()
                    });

                return Ok(response);
            }
            else if(options.DateFrom == null && options.DateFor != null)
            {
                var dateFrom = _myCallsApiService.GetReferencePoint();
                var dateFor = DateTime.Now.AddDays(1);

                var response = _myCallsApiService.GetCallsByDateAndManager(dateFrom, dateFor, options.ManagerId)
                    .Results
                    .Select(x => new CallVM
                    {
                        Date = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddSeconds(x.Start_time).AddHours(3).ToString("dd.MM.yyyy HH:ss"),
                        Duration = TimeSpan.FromSeconds(x.Duration).ToString(@"mm\:ss"),
                        Recording = x.Recording,
                        ClientTitle = _clientService.GetClientByPhone(x.Src_number)?.Title ?? "",
                        Src_Number = x.Src_number.PhoneFormat()
                    });

                return Ok(response);
            }

            return BadRequest();
        }*/
    }
}