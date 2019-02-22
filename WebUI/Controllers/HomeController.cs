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
        private readonly IUserService _userService;

        public HomeController(IUserService userService)
        {
            _userService = userService;
        }

        public IActionResult Index()
        {
            try
            {
                var userLogin = HttpContext.User.Identity.Name;

                //Юзер берется из бд
                var user = _userService.GetAll().FirstOrDefault(x => x.Login == userLogin);

                if (user is Manager)
                    return RedirectToAction("Index", "Client");
                else if (user is Admin)
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