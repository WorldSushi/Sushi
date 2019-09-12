using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace WebUI.Controllers
{
    public class ReportController : ControllerBase
    {
        [HttpGet]
        [Route("Report")]
        public IActionResult Get(string name)
        {
            FileStream stream = null;
            if (name == "AllDebitory")
            {
                stream = new FileStream("PDF/All/Debytory.pdf", FileMode.Open);
            }
            return new FileStreamResult(stream, "application/pdf");
        }
    }
}