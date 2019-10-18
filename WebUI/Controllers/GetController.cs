using Data;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Data.Entities.Users;
using Data.Enums;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using WebUI.Model;

namespace WebUI.Controllers
{
    public class GetController : ControllerBase
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_Manager?$format=json");
        private readonly ApplicationContext _context;

        public GetController(ApplicationContext context)
        {
            request.UserAgent = "World Sushi";
            System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
            request.Credentials = new NetworkCredential("chuprina.r.v@gmail.com", "123");
            _context = context;
        }

        [HttpGet]
        [Route("test")]
        public void Test()
        {
            ApplicationContext applicationContext = new ApplicationContext();
            List<Manager> managers = applicationContext.Set<Manager>().ToList();
            List<WorkGroup> workGroups = applicationContext.Set<WorkGroup>().ToList();
            //_context.Set<Manager>().RemoveRange(_context.Set<Manager>());
            //_context.SaveChanges();
            //foreach (Manager manager in managers)
            //{
            //    System.IO.File.AppendAllText("phone.txt", $"{manager.Login}: {manager.Phone}\n");
            //}
            //foreach (Manager manager in managers)
            //{
            //    WorkGroup WorkGroup = workGroups.FirstOrDefault(w => w.RegionalManagerId == manager.Id);
            //    if (WorkGroup != null)
            //    {
            //        Manager manager1 = managers.FirstOrDefault(m => m.Id == WorkGroup.EscortManagerId);
            //        if (manager1 != null)
            //        {
            //            System.IO.File.AppendAllText("work.txt", $"Name: {WorkGroup.Title} RM:{manager.Login} MC:{manager1.Login}\n");
            //        }
            //    }
            //}
            //HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            //Stream receiveStream = response.GetResponseStream();
            //StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            //string content = readStream.ReadToEnd();
            //var responseAppS = JObject.Parse(content);
            //List<ManagerModel> managerModels = JsonConvert.DeserializeObject<List<ManagerModel>>(responseAppS.
            //            SelectToken("value").ToString()).Where(m => m.Manager != "" && m.Manager_ID != "").ToList();
            //foreach (ManagerModel managerModel in managerModels)
            //{
            //    Manager manager = _context.Set<Manager>().Add(new Manager()
            //    {
            //        Login = managerModel.Manager,
            //        typeManager = TypeManager.Manager,
            //        Password = "1234",
            //        Phone = managers.FirstOrDefault(m => m.Login == managerModel.Manager) != null ? managers.FirstOrDefault(m => m.Phone == managerModel.Phone).Phone : ""
            //    }).Entity;
            //    _context.Set<UserInfo>().Add(new UserInfo(manager, new System.Guid(managerModel.Manager_ID)));
            //    _context.SaveChanges();
            //}
        }

        [HttpGet]
        [Route("Clear")]
        public void ClearManager(string name)
        {
            if (_context.Set<Manager>().FirstOrDefault(m => m.Login == name) != null)
            {
                _context.Set<Manager>().Remove(_context.Set<Manager>().FirstOrDefault(m => m.Login == name));
                _context.SaveChanges();
            }
        }
    }
}