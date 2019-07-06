using System;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
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
    }
}