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
            else if(name == "AllSalle")
            {
                stream = new FileStream("PDF/All/Salles.pdf", FileMode.Open);
            }
            else if (name == "AllOpros")
            {
                stream = new FileStream("PDF/All/Opros.pdf", FileMode.Open);
            }
            else if (name == "AllNomll")
            {
                stream = new FileStream("PDF/All/Nomkl.pdf", FileMode.Open);
            }
            return new FileStreamResult(stream, "application/pdf");
        }
    }
}