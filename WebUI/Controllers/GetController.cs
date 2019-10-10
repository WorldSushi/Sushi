using Data;
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
            //UserInfo userInfo = _context.Set<UserInfo>().FirstOrDefault(u => u.OneCId.ToString() == "5119e9e1-c847-11e7-99bb-00155dc2a712");
            //Manager manager = _context.Set<Manager>().FirstOrDefault(m => m.Id == userInfo.UserId);

            //HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            //Stream receiveStream = response.GetResponseStream();
            //StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            //string content = readStream.ReadToEnd();
            //var responseAppS = JObject.Parse(content);
            //List<ManagerModel> managerModels = JsonConvert.DeserializeObject<List<ManagerModel>>(responseAppS.
            //            SelectToken("value").ToString()).Where(m => m.Manager != "" && m.Manager_ID != "").ToList();
            //foreach(ManagerModel managerModel in managerModels)
            //{
            //    Manager manager = _context.Set<Manager>().Add(new Manager()
            //    {
            //        Login = managerModel.Manager,
            //        typeManager = TypeManager.Manager,
            //        Password = "1234"
            //    }).Entity;
            //    _context.Set<UserInfo>().Add(new UserInfo(manager, new System.Guid(managerModel.Manager_ID)));
            //    _context.SaveChanges();
            //}
        }
    }
}