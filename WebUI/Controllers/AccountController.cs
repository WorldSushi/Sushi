using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Data;
using Data.Commands.Account;
using Data.Commands.Manager;
using Data.Entities.Users;
using Data.Enums;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserService _userService;
        private readonly ApplicationContext _applicationContext;

        public AccountController(IUserService userService, ApplicationContext applicationContext)
        {
            _userService = userService;
            _applicationContext = applicationContext;
        }

        public IActionResult Index()
        {
            //var user = _userService.GetAll().ToList();
            //if(user == null || user.Count == 0)
            //{
            //    _userService.CreateAdmin("admin", "admin");
            //}
            return View(); //Redirect("/Home/ImportFileClients");
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            if (ModelState.IsValid) 
            {
                var user = _userService.GetAll()
                    .FirstOrDefault(x => x.Login == command.Login
                                         && x.Password == command.Password);
                if (user != null)
                {
                    await Authenticate(user);
                    if (user is Admin)
                        return Redirect("/admin");
                    else if(user is Manager)
                    {
                        if (((Manager)user).typeManager == TypeManager.Admin)
                        {
                            return Redirect("/admin");
                        }
                        else if (((Manager)user).typeManager == TypeManager.Marketolog)
                        {
                            return Redirect("/manager-any");
                        }
                        else if (((Manager)user).typeManager == TypeManager.Manager)
                        {
                            return Redirect("/manager-rm");
                        }
                        else if (((Manager)user).typeManager == TypeManager.Call_Checker)
                        {
                            return Redirect("/controler");
                        }
                    }
                }
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }

            throw new Exception("Имя пользователя и/или пароль неправильный");
        }

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Account");
        }
    }
}