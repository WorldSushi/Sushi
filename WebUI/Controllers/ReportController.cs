using Microsoft.AspNetCore.Mvc;
using System.IO;
using WebUI.Services.Abstract;

namespace WebUI.Controllers
{
    public class ReportController : ControllerBase
    {
        private readonly IAccountInformationService _accountService;


        public ReportController(IAccountInformationService accountService)
        {
            _accountService = accountService;
            //admin.
            //_context.Set<Data.Entities.Users.Admin>
        }

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

        [HttpGet]
        [Route("ReportManager")]
        public IActionResult GetReortForManager(string name)
        {
            int idManager = _accountService.CurrentUser().Id;
            FileStream stream = null;
            if (name == "Debitory")
            {
                stream = new FileStream($"PDF/Manager/Debytory{idManager}.pdf", FileMode.Open);
            }
            else if (name == "Salle")
            {
                stream = new FileStream($"PDF/Manager/Salles{idManager}.pdf", FileMode.Open);
            }
            else if (name == "Opros")
            {
                stream = new FileStream($"PDF/Manager/Opros{idManager}.pdf", FileMode.Open);
            }
            else if (name == "Nomll")
            {
                stream = new FileStream($"PDF/Manager/Nomkl{idManager}.pdf", FileMode.Open);
            }
            return new FileStreamResult(stream, "application/pdf");
        }

        [HttpGet]
        [Route("ReportClienr")]
        public IActionResult GetReortForManager(string name, string clientId)
        {
            FileStream stream = null;
            if (name == "Debitory")
            {
                stream = new FileStream($"PDF/Client/Debytory{clientId}.pdf", FileMode.Open);
            }
            else if (name == "Salle")
            {
                stream = new FileStream($"PDF/Client/Salles{clientId}.pdf", FileMode.Open);
            }
            else if (name == "Opros")
            {
                stream = new FileStream($"PDF/Client/Opros{clientId}.pdf", FileMode.Open);
            }
            else if (name == "Nomll")
            {
                stream = new FileStream($"PDF/Client/Nomkl{clientId}.pdf", FileMode.Open);
            }
            return new FileStreamResult(stream, "application/pdf");
        }
    }
}