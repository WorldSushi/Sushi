using Data;
using Data.Entities.OneCInfo;
using FluentScheduler;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WebUI.Background.Report.Model.Opros;

namespace WebUI.Background.Report
{
    public class OprosReport : IJob
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_Opros?$format=json");
        private readonly ApplicationContext _context;

        public OprosReport(ApplicationContext context)
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
            List<OprosModel> nomenclatures = JsonConvert.DeserializeObject<List<OprosModel>>(responseAppS.
                        SelectToken("value").ToString());
            CreatePdf(nomenclatures);
        }

        private void CreatePdf(List<OprosModel> oprosModels)
        {
            List<ClientInfo> clientInfos = _context.Set<ClientInfo>().ToList();
            List<UserInfo> userInfos = _context.Set<UserInfo>().ToList();
            Dictionary<int, List<OprosModel>> orprosManager = new Dictionary<int, List<OprosModel>>();
            Dictionary<int, List<OprosModel>> orprosClient = new Dictionary<int, List<OprosModel>>();
            Document doc = new Document();
            if (!Directory.Exists("PDF/All"))
            {
                Directory.CreateDirectory("PDF/All");
            }
            PdfWriter.GetInstance(doc, new FileStream("PDF/All/Opros.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(9);
            table.TotalWidth = 590f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now} по опросу", font));
            cell.Colspan = 9;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Контрагент", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Менеджер", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Номенклатура", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Среднее количество", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Средняя сумма", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Бренд", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Объем", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Упаковка", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Комментарий", font));
            cell.Colspan = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            foreach(OprosModel oprosModel in oprosModels)
            {
                UserInfo userInfo = userInfos.FirstOrDefault(u => u.OneCId.ToString() == oprosModel.Manager_ID);
                ClientInfo clientInfo = clientInfos.FirstOrDefault(c => c.OneCId.ToString() == oprosModel.Contragent_ID);
                if (userInfo != null)
                {
                    if (!orprosManager.ContainsKey(userInfo.UserId))
                    {
                        orprosManager.Add(userInfo.UserId, new List<OprosModel>()
                    {
                        oprosModel
                    });
                    }
                    else
                    {
                        orprosManager[userInfo.UserId].Add(oprosModel);
                    }
                }
                if (clientInfo != null)
                {
                    if (!orprosClient.ContainsKey(clientInfo.ClientId))
                    {
                        orprosClient.Add(clientInfo.ClientId, new List<OprosModel>()
                    {
                        oprosModel
                    });
                    }
                    else
                    {
                        orprosClient[clientInfo.ClientId].Add(oprosModel);
                    }
                }
                cell = new PdfPCell(new Phrase($"{oprosModel.Contragent}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 0;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.Manager}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 0;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.Nomenclature_Opros}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 0;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.SredKol}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 2;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.SredSumm}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 2;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.Brend}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 0;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.Volume}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 2;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.Packaging}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 2;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{oprosModel.Comment}", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 251, 240);
                cell.HorizontalAlignment = 0;
                table.AddCell(cell);
            }
            doc.Add(table);
            doc.Close();
            CreateManagerPdf(orprosManager);
            CreateClientPdf(orprosClient);
        }

        private void CreateClientPdf(Dictionary<int, List<OprosModel>> orprosClient)
        {
            if (!Directory.Exists("PDF/Client"))
            {
                Directory.CreateDirectory("PDF/Client");
            }
            foreach (var mana in orprosClient.Keys)
            {
                Document doc = new Document();
                PdfWriter.GetInstance(doc, new FileStream($"PDF/Client/Opros{mana}.pdf", FileMode.Create));
                doc.Open();
                doc.SetMargins(0, 0, 3, 3);
                BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
                PdfPTable table = new PdfPTable(9);
                table.TotalWidth = 590f;
                table.LockedWidth = true;
                PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now} по опросу", font));
                cell.Colspan = 9;
                cell.HorizontalAlignment = 0;
                cell.Border = 0;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Контрагент", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Менеджер", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Номенклатура", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Среднее количество", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Средняя сумма", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Бренд", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Объем", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Упаковка", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Комментарий", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                foreach (OprosModel oprosModel in orprosClient.GetValueOrDefault(mana))
                {
                    cell = new PdfPCell(new Phrase($"{oprosModel.Contragent}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Manager}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Nomenclature_Opros}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.SredKol}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.SredSumm}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Brend}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Volume}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Packaging}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Comment}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                }
                doc.Add(table);
                doc.Close();
            }
        }

        private void CreateManagerPdf(Dictionary<int, List<OprosModel>> orprosManager)
        {
            if (!Directory.Exists("PDF/Manager"))
            {
                Directory.CreateDirectory("PDF/Manager");
            }
            foreach (var mana in orprosManager.Keys)
            {
                Document doc = new Document();
                PdfWriter.GetInstance(doc, new FileStream($"PDF/Manager/Opros{mana}.pdf", FileMode.Create));
                doc.Open();
                doc.SetMargins(0, 0, 3, 3);
                BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
                PdfPTable table = new PdfPTable(9);
                table.TotalWidth = 590f;
                table.LockedWidth = true;
                PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now} по опросу", font));
                cell.Colspan = 9;
                cell.HorizontalAlignment = 0;
                cell.Border = 0;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Контрагент", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Менеджер", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Номенклатура", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Среднее количество", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Средняя сумма", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Бренд", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Объем", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Упаковка", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Комментарий", font));
                cell.Colspan = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                cell.HorizontalAlignment = 1;
                table.AddCell(cell);
                foreach (OprosModel oprosModel in orprosManager.GetValueOrDefault(mana))
                {
                    cell = new PdfPCell(new Phrase($"{oprosModel.Contragent}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Manager}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Nomenclature_Opros}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.SredKol}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.SredSumm}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Brend}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Volume}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Packaging}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{oprosModel.Comment}", font));
                    cell.Colspan = 1;
                    cell.BackgroundColor = new BaseColor(245, 251, 240);
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                }
                doc.Add(table);
                doc.Close();
            }
        }
    }
}