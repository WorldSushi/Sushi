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
            nomenclatures = nomenclatures.Where(s => DateTime.Parse(s.Period) >= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1)).ToList();
            List<ManagerModel> managerModels = SortToMonteAndClients(nomenclatures);
            CreatePdf(managerModels);
        }

        private void CreatePdf(List<ManagerModel> managerModels)
        {
            Document doc = new Document();
            if (!Directory.Exists("PDF/All"))
            {
                Directory.CreateDirectory("PDF/All");
            }
            PdfWriter.GetInstance(doc, new FileStream("PDF/All/Nomkl.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(10);
            table.TotalWidth = 550f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Анализ проданных позиций товаров за период {new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1)} - {DateTime.Now}", font));
            cell.Colspan = 10;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
            cell = new PdfPCell(new Phrase($"Менеджер (ответственный за заказ) /Контрагент/ Номенклатура", font));
            cell.Colspan = 8;
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Количество номен-ры", font));
            cell.Colspan = 2;
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            foreach(ManagerModel managerModel in managerModels)
            {
                CreateManagerPdf(managerModel);
                cell = new PdfPCell(new Phrase($"{managerModel.Name}", font));
                cell.Colspan = 8;
                cell.HorizontalAlignment = 0;
                cell.BackgroundColor = new BaseColor(255, 204, 153);
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{managerModel.SumeKolNom}", font));
                cell.Colspan = 2;
                cell.HorizontalAlignment = 2;
                cell.BackgroundColor = new BaseColor(255, 204, 153);
                table.AddCell(cell);
                foreach(GRContragent gRContragent in managerModel.GRContragents)
                {
                    cell = new PdfPCell(new Phrase($"{gRContragent.Name}", font));
                    cell.Colspan = 8;
                    cell.HorizontalAlignment = 0;
                    cell.BackgroundColor = new BaseColor(178, 172, 132);
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{gRContragent.SumeKolNom}", font));
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = 2;
                    cell.BackgroundColor = new BaseColor(178, 172, 132);
                    table.AddCell(cell);
                    foreach(string nomekl in gRContragent.Nomenclatures)
                    {
                        cell = new PdfPCell(new Phrase($"{nomekl}", font));
                        cell.Colspan = 8;
                        cell.HorizontalAlignment = 0;
                        table.AddCell(cell);
                        cell = new PdfPCell(new Phrase($"{1}", font));
                        cell.Colspan = 2;
                        cell.HorizontalAlignment = 2;
                        table.AddCell(cell);
                    }
                }
            }
            doc.Add(table);
            doc.Close();
        }

        private void CreateManagerPdf(ManagerModel managerModel)
        {
            Document doc = new Document();
            if (!Directory.Exists("PDF/Manager"))
            {
                Directory.CreateDirectory("PDF/Manager");
            }
            PdfWriter.GetInstance(doc, new FileStream($"PDF/Manager/Nomkl{managerModel.MangerId}.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(10);
            table.TotalWidth = 550f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Анализ проданных позиций товаров за период {new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1)} - {DateTime.Now}", font));
            cell.Colspan = 10;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
            cell = new PdfPCell(new Phrase($"Менеджер (ответственный за заказ) /Контрагент/ Номенклатура", font));
            cell.Colspan = 8;
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Количество номен-ры", font));
            cell.Colspan = 2;
            cell.HorizontalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"{managerModel.Name}", font));
            cell.Colspan = 8;
            cell.HorizontalAlignment = 0;
            cell.BackgroundColor = new BaseColor(255, 204, 153);
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"{managerModel.SumeKolNom}", font));
            cell.Colspan = 2;
            cell.HorizontalAlignment = 2;
            cell.BackgroundColor = new BaseColor(255, 204, 153);
            table.AddCell(cell);
            foreach (GRContragent gRContragent in managerModel.GRContragents)
            {
                cell = new PdfPCell(new Phrase($"{gRContragent.Name}", font));
                cell.Colspan = 8;
                cell.HorizontalAlignment = 0;
                cell.BackgroundColor = new BaseColor(178, 172, 132);
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"{gRContragent.SumeKolNom}", font));
                cell.Colspan = 2;
                cell.HorizontalAlignment = 2;
                cell.BackgroundColor = new BaseColor(178, 172, 132);
                table.AddCell(cell);
                foreach (string nomekl in gRContragent.Nomenclatures)
                {
                    cell = new PdfPCell(new Phrase($"{nomekl}", font));
                    cell.Colspan = 8;
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    cell = new PdfPCell(new Phrase($"{1}", font));
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                }
            }
            doc.Add(table);
            doc.Close();
        }

        private List<ManagerModel> SortToMonteAndClients(List<NomenclatureModel> nomenclatures)
        {
            List<UserInfo> userInfos = _context.Set<UserInfo>().ToList();
            List<ManagerModel> managerModels = new List<ManagerModel>();
            foreach(NomenclatureModel nomenclatureModel in nomenclatures)
            {
                UserInfo userInfo = userInfos.FirstOrDefault(u => u.OneCId.ToString() == nomenclatureModel.Manager_ID);
                if(userInfo != null)
                {
                    ManagerModel managerModel = managerModels.FirstOrDefault(m => m.OneCIdM.ToString() == nomenclatureModel.Manager_ID);
                    if(managerModel != null)
                    {
                        managerModel.SumeKolNom += 1;
                        GRContragent gRContragent = managerModel.GRContragents.FirstOrDefault(m => m.Name.ToString() == nomenclatureModel.GR_Contragent);
                        if(gRContragent != null)
                        {
                            gRContragent.SumeKolNom += 1;
                            gRContragent.Nomenclatures.Add(nomenclatureModel.Nomenclature);
                        }
                        else
                        {
                            managerModel.GRContragents.Add(new GRContragent()
                            {
                                Name = nomenclatureModel.GR_Contragent,
                                Nomenclatures = new List<string>()
                                {
                                    nomenclatureModel.Nomenclature
                                },
                                SumeKolNom = 1
                            });
                        }
                    }
                    else
                    {
                        managerModels.Add(new ManagerModel()
                        {
                            MangerId = userInfo.Id,
                            OneCIdM = userInfo.OneCId,
                            Name = nomenclatureModel.Manager,
                            SumeKolNom = 1,
                            GRContragents = new List<GRContragent>()
                            {
                                new GRContragent()
                                {
                                    Name = nomenclatureModel.GR_Contragent,
                                    SumeKolNom = 1,
                                    Nomenclatures = new List<string>()
                                    {
                                        nomenclatureModel.Nomenclature
                                    }
                                }
                            }
                        });
                    }
                }
            }
            return managerModels;
        }
    }
}