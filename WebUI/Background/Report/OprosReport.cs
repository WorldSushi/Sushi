using Data;
using FluentScheduler;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
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