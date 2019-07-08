using System;
using System.IO;
using System.Linq;
using System.Text;
using Base.Helpers;
using Data;
using Data.Entities.Calls;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMyCallsAPIService _myCallsApiService;
        private readonly ApplicationContext _context;

        public HomeController(IMyCallsAPIService myCallsApiService,
            ApplicationContext context)
        {
            _myCallsApiService = myCallsApiService;
            _context = context;
        }

        [HttpGet]
        public IActionResult ImportFile()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFile(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.GetEncoding(1251).GetString(data);
            string[] lines = result.Split('\r');

            for (var i = 0; i < lines.Length; i++)
            {
                string[] rows = lines[i].Split(';');
            }

            return RedirectToAction("ImportFile");
        }

        public void MyCallsTest()
        {
            _myCallsApiService.SaveNewCalls();
        }

        public IActionResult Index()
        {
            return Redirect("/Account/Index");
        }
    }
}