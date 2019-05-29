using Data.Entities.Users;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using WebUI.Services.Abstract;

namespace WebUI.Services.Concrete
{
    public class AccountInformationService : IAccountInformationService
    {
        private readonly IUserService _userService;
        private readonly HttpContext _httpContext;

        public AccountInformationService(IUserService userService,
            IHttpContextAccessor httpContext)
        {
            _userService = userService;
            _httpContext = httpContext.HttpContext;
        }

        public int GetOperatorId()
        {
            return CurrentUser().Id;
        }

        public string GetLayout()
        {
            const string adminLayout = "~/Views/Shared/_AdminLayout.cshtml";
            const string managerLayout = "~/Views/Shared/_ManagerLayout.cshtml";

            if (CurrentUser() is Admin)
                return adminLayout;
            else if (CurrentUser() is Manager)
                return managerLayout;
            else
                throw new Exception("Роль пользователя неопределена");
        }

        private User CurrentUser()
        {
            return _userService.GetAll().FirstOrDefault(x => x.Login == _httpContext.User.Identity.Name);
        }
    }
}
