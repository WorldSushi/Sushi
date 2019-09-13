using Data;
using FluentScheduler;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WebUI.Background.Report.Model.Nomenclatures;

namespace WebUI.Background.Report
{
    public class Nomenclature : IJob
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_Nomenclature?$format=json");
        private readonly ApplicationContext _context;

        public Nomenclature(ApplicationContext context)
        {
            _context = context;
        }

        public void Execute()
        {
            request.UserAgent = "World Sushi";
            System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
            request.Credentials = new NetworkCredential("chuprina.r.v@gmail.com", "123");
            Task.Run(() => WorkNomenclatures());
        }

        private void WorkNomenclatures()
        {
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream receiveStream = response.GetResponseStream();
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            string content = readStream.ReadToEnd();
            var responseAppS = JObject.Parse(content);
            List<NomenclatureModel> nomenclatures = JsonConvert.DeserializeObject<List<NomenclatureModel>>(responseAppS.
                        SelectToken("value").ToString());
            //List<ManagerAndDebitory> managerAndDebitories = SortToMonteAndClients(debitorkas);
            //CreatePdf(managerAndDebitories);
        }
    }
}