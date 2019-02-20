using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Entities.Users;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IManagerService _managerService;

        public HomeController(IManagerService managerService)
        {
            _managerService = managerService;
        }

        public IActionResult Index()
        {
            try
            {
                var userLogin = HttpContext.User.Identity.Name;

                //Юзер берется из бд
                var user = _managerService.GetAll().FirstOrDefault(x => x.Login == userLogin);

                if (user is Manager)
                    return RedirectToAction("Index", "Manager");

                return RedirectToAction("Index", "Account");
            }
            catch (Exception e)
            {
                return RedirectToAction("Index", "Account");
            }
        }
    }
}