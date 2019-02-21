using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.DTO.Users;
using Data.Entities.Users;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers.Users
{
    [Authorize]
    public class ManagerController : Controller
    {
        private readonly IManagerService _managerService;

        public ManagerController(IManagerService managerService)
        {
            _managerService = managerService;
        }

        public IActionResult Index()
        {
            var response = _managerService.GetAll()
                .Select(x => new ManagerDTO
                {
                    Login = x.Login,
                    Password = x.Password,
                    Phone = x.Phone
                });

            return View(response);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string login, string password, string phone)
        {
            _managerService.Create(login, password, phone);

            return RedirectToAction("Index");
        }
    }
}