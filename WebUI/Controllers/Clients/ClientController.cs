using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Enums;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers.Clients
{
    [Authorize]
    public class ClientController : Controller
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        public IActionResult Index()
        {
            var response = _clientService.GetAll();

            return View(response);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string title, string phone, string legalEntity, ClientTypes clientTypes, NumberOfCalls numberOfCalls)
        {
            _clientService.Create(title, phone, legalEntity, clientTypes, numberOfCalls);

            return RedirectToAction("Index");
        }
    }
}