using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Entities.ClientContacts;
using Data.Entities.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountInformationService _accountService;
        private readonly DbContext _context;


        public AccountController(IAccountInformationService accountService,
             DbContext context)
        {
            _accountService = accountService;
            _context = context;
            //Data.Entities.Users.Admin admin = new Data.Entities.Users.Admin();
            //admin.
            //_context.Set<Data.Entities.Users.Admin>
        }

        [HttpGet]
        public IActionResult Get()
        {
            var response = new {
                Id = _accountService.CurrentUser().Id,
                Login = _accountService.CurrentUser().Login,
                Role = _accountService.CurrentUser() is Data.Entities.Users.Admin
                    ? "Admin"
                    : ((Data.Entities.Users.Manager)_accountService.CurrentUser()).typeManager == Data.Enums.TypeManager.Admin 
                    || ((Data.Entities.Users.Manager)_accountService.CurrentUser()).typeManager == Data.Enums.TypeManager.Call_Checker ? "Admin"
                    : "Manager",
                Workgroup = _accountService.CurrentUser() is Data.Entities.Users.Admin
                    ? null
                    : _context.Set<WorkGroup>()
                        .FirstOrDefault(x => x.EscortManagerId == _accountService.GetOperatorId() || x.RegionalManagerId == _accountService.GetOperatorId())
            };

            return Ok(response);
        }

        [HttpGet]
        [Route("Name")]
        public IActionResult GetName()
        {
            var response = new
            {
                Id = _accountService.CurrentUser().Id,
                Login = _accountService.CurrentUser().Login,
                Role = _accountService.CurrentUser() is Data.Entities.Users.Admin
                    ? "Admin"
                    : ((Data.Entities.Users.Manager)_accountService.CurrentUser()).typeManager == Data.Enums.TypeManager.Admin
                    || ((Data.Entities.Users.Manager)_accountService.CurrentUser()).typeManager == Data.Enums.TypeManager.Call_Checker ? "Admin"
                    : "Manager",
                Workgroup = _accountService.CurrentUser() is Data.Entities.Users.Admin
                    ? null
                    : _context.Set<WorkGroup>()
                        .FirstOrDefault(x => x.EscortManagerId == _accountService.GetOperatorId() || x.RegionalManagerId == _accountService.GetOperatorId())
            };

            return Ok(response);
        }
    }
}