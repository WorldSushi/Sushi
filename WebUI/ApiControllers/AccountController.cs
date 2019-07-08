using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Entities.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountInformationService _accountService;

        public AccountController(IAccountInformationService accountService)
        {
            _accountService = accountService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var response = new {
                Login = _accountService.CurrentUser().Login,
                Role = _accountService.CurrentUser() is Admin
                    ? "Admin"
                    : "Manager"
            };

            return Ok(response);
        }
    }
}