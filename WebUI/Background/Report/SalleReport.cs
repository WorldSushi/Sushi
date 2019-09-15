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
using WebUI.Background.Report.Model;
using WebUI.Background.Report.Model.Salles;

namespace WebUI.Background.Report
{
    public class SalleReport : IJob
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_sales?$format=json");
        private readonly ApplicationContext _context;

        public SalleReport(ApplicationContext context)
        {
            _context = context;
        }

        public void Execute()
        {
            request.UserAgent = "World Sushi";
            System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
            request.Credentials = new NetworkCredential("chuprina.r.v@gmail.com", "123");
            Task.Run(() => WorkSales());
        }

        private void WorkSales()
        {
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream receiveStream = response.GetResponseStream();
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            string content = readStream.ReadToEnd();
            var responseAppS = JObject.Parse(content);
            List<Salle> salles = JsonConvert.DeserializeObject<List<Salle>>(responseAppS.
                        SelectToken("value").ToString());
            salles = salles.Where(s => DateTime.Parse(s.Period) >= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-5)).ToList();
            List<AdminAndSalles> adminAndSalles = SortToMonteAndClients(salles);
            CreatePdf(adminAndSalles);
        }

        private async void CreatePdf(List<AdminAndSalles> adminAndSalless)
        {
            Document doc = new Document();
            if (!Directory.Exists("PDF/All"))
            {
                Directory.CreateDirectory("PDF/All");
            }
            PdfWriter.GetInstance(doc, new FileStream("PDF/All/Salles.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(8);

            table.TotalWidth = 590f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now.ToLongDateString()} по продажам", font));
            cell.Colspan = 8;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Групы контнр-агентов", font));
            cell.Colspan = 1;
            cell.HorizontalAlignment = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            table.AddCell(cell);
            for (DateTime i = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-5); i <= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1); i = i.AddMonths(1))
            {
                cell = new PdfPCell(new Phrase($"{i.ToLongDateString().Remove(0, 2)}", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                table.AddCell(cell);
            }
            cell = new PdfPCell(new Phrase($"Итог", font));
            cell.Colspan = 1;
            cell.HorizontalAlignment = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            table.AddCell(cell);
            foreach (AdminAndSalles adminAndSalles in adminAndSalless)
            {
                CreateManagerPdf(adminAndSalles);
                font = new iTextSharp.text.Font(baseFont, 11, iTextSharp.text.Font.NORMAL);
                cell = new PdfPCell(new Phrase($"{adminAndSalles.Name}", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 0;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                table.AddCell(cell);
                for (int i = adminAndSalles.SumeMonthe.Length - 1; i >= 0; i--)
                {
                    cell = new PdfPCell(new Phrase($"{adminAndSalles.SumeMonthe[i]} руб", font));
                    cell.Colspan = 1;
                    cell.HorizontalAlignment = 2;
                    cell.BackgroundColor = new BaseColor(245, 242, 221);
                    table.AddCell(cell);
                }
                cell = new PdfPCell(new Phrase($"{adminAndSalles.Sume} руб", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 2;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                table.AddCell(cell);
                foreach (GoupAndSalle goupAndSalle in adminAndSalles.GoupAndSalles)
                {
                    CreateClienrPdf(goupAndSalle);
                    font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
                    cell = new PdfPCell(new Phrase($"{goupAndSalle.Name}", font));
                    cell.Colspan = 1;
                    cell.HorizontalAlignment = 0;
                    table.AddCell(cell);
                    for (int i = goupAndSalle.SumeMonthe.Length-1; i >= 0; i--)
                    {
                        cell = new PdfPCell(new Phrase($"{goupAndSalle.SumeMonthe[i]} руб", font));
                        cell.Colspan = 1;
                        cell.HorizontalAlignment = 2;
                        table.AddCell(cell);
                    }
                    cell = new PdfPCell(new Phrase($"{goupAndSalle.Sume} руб", font));
                    cell.Colspan = 1;
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                }
            }
            doc.Add(table);
            doc.Close();
        }

        private void CreateClienrPdf(GoupAndSalle goupAndSalle)
        {
            if (!Directory.Exists("PDF/Client"))
            {
                Directory.CreateDirectory("PDF/Client");
            }
            foreach (int idClient in goupAndSalle.ClientIdS)
            {
                Document doc = new Document();
                PdfWriter.GetInstance(doc, new FileStream($"PDF/Client/Salles{idClient}.pdf", FileMode.Create));
                doc.Open();
                doc.SetMargins(0, 0, 3, 3);
                BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL);
                PdfPTable table = new PdfPTable(8);

                table.TotalWidth = 590f;
                table.LockedWidth = true;
                PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now.ToLongDateString()} по продажам", font));
                cell.Colspan = 8;
                cell.HorizontalAlignment = 0;
                cell.Border = 0;
                table.AddCell(cell);
                cell = new PdfPCell(new Phrase($"Групы контнр-агентов", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                table.AddCell(cell);
                for (DateTime i = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-5); i <= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1); i = i.AddMonths(1))
                {
                    cell = new PdfPCell(new Phrase($"{i.ToLongDateString().Remove(0, 2)}", font));
                    cell.Colspan = 1;
                    cell.HorizontalAlignment = 1;
                    cell.BackgroundColor = new BaseColor(245, 242, 221);
                    table.AddCell(cell);
                }
                cell = new PdfPCell(new Phrase($"Итог", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                table.AddCell(cell); font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
                cell = new PdfPCell(new Phrase($"{goupAndSalle.Name}", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 0;
                table.AddCell(cell);
                for (int i = goupAndSalle.SumeMonthe.Length - 1; i >= 0; i--)
                {
                    cell = new PdfPCell(new Phrase($"{goupAndSalle.SumeMonthe[i]} руб", font));
                    cell.Colspan = 1;
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                }
                cell = new PdfPCell(new Phrase($"{goupAndSalle.Sume} руб", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 2;
                table.AddCell(cell);
                doc.Add(table);
                doc.Close();
            }
        }

        private void CreateManagerPdf(AdminAndSalles adminAndSalles)
        {
            Document doc = new Document();
            if (!Directory.Exists("PDF/Manager"))
            {
                Directory.CreateDirectory("PDF/Manager");
            }
            PdfWriter.GetInstance(doc, new FileStream($"PDF/Manager/Salles{adminAndSalles.MangerId}.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(8);

            table.TotalWidth = 590f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now.ToLongDateString()} по продажам", font));
            cell.Colspan = 8;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase($"Групы контнр-агентов", font));
            cell.Colspan = 1;
            cell.HorizontalAlignment = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            table.AddCell(cell);
            for (DateTime i = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1).AddMonths(-5); i <= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1); i = i.AddMonths(1))
            {
                cell = new PdfPCell(new Phrase($"{i.ToLongDateString().Remove(0, 2)}", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 1;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                table.AddCell(cell);
            }
            cell = new PdfPCell(new Phrase($"Итог", font));
            cell.Colspan = 1;
            cell.HorizontalAlignment = 1;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            table.AddCell(cell); font = new iTextSharp.text.Font(baseFont, 11, iTextSharp.text.Font.NORMAL);
            cell = new PdfPCell(new Phrase($"{adminAndSalles.Name}", font));
            cell.Colspan = 1;
            cell.HorizontalAlignment = 0;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            table.AddCell(cell);
            for (int i = adminAndSalles.SumeMonthe.Length - 1; i >= 0; i--)
            {
                cell = new PdfPCell(new Phrase($"{adminAndSalles.SumeMonthe[i]} руб", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 2;
                cell.BackgroundColor = new BaseColor(245, 242, 221);
                table.AddCell(cell);
            }
            cell = new PdfPCell(new Phrase($"{adminAndSalles.Sume} руб", font));
            cell.Colspan = 1;
            cell.HorizontalAlignment = 2;
            cell.BackgroundColor = new BaseColor(245, 242, 221);
            table.AddCell(cell);
            foreach (GoupAndSalle goupAndSalle in adminAndSalles.GoupAndSalles)
            {
                font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
                cell = new PdfPCell(new Phrase($"{goupAndSalle.Name}", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 0;
                table.AddCell(cell);
                for (int i = goupAndSalle.SumeMonthe.Length - 1; i >= 0; i--)
                {
                    cell = new PdfPCell(new Phrase($"{goupAndSalle.SumeMonthe[i]} руб", font));
                    cell.Colspan = 1;
                    cell.HorizontalAlignment = 2;
                    table.AddCell(cell);
                }
                cell = new PdfPCell(new Phrase($"{goupAndSalle.Sume} руб", font));
                cell.Colspan = 1;
                cell.HorizontalAlignment = 2;
                table.AddCell(cell);
            }
            doc.Add(table);
            doc.Close();
        }

        private List<AdminAndSalles> SortToMonteAndClients(List<Salle> salles)
        {
            List<ClientInfo> clientInfos = _context.Set<ClientInfo>().ToList();
            List<UserInfo> userInfos = _context.Set<UserInfo>().ToList();
            List<AdminAndSalles> adminAndSalless = new List<AdminAndSalles>();
            foreach (Salle salle in salles)
            {
                ClientInfo clientInfo = clientInfos.FirstOrDefault(c => c.OneCId.ToString() == salle.Contragent_ID);
                UserInfo userInfo = userInfos.FirstOrDefault(u => u.OneCId.ToString() == salle.Manager_ID);
                int numbermonthe = (DateTime.Now.Month - DateTime.Parse(salle.Period).Month);
                if(numbermonthe < 0)
                {
                    numbermonthe = (DateTime.Parse(salle.Period).Month - DateTime.Now.Month);
                }
                if (clientInfo != null)
                {
                    if (userInfo != null)
                    {
                        AdminAndSalles adminAndSalles = adminAndSalless.FirstOrDefault(m => m.OneCIdM.ToString() == salle.Manager_ID);
                        if (adminAndSalles != null)
                        {
                            adminAndSalles.Sume += Convert.ToDouble(salle.Summa.Replace('.', ','));
                            adminAndSalles.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                            GoupAndSalle goupAndSalle = adminAndSalles.GoupAndSalles.FirstOrDefault(m => m.Name.ToString() == salle.GR_Contragent);
                            if (goupAndSalle != null)
                            {
                                goupAndSalle.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                                goupAndSalle.Sume += Convert.ToDouble(salle.Summa.Replace('.', ','));
                                goupAndSalle.ClientIdS.Add(clientInfo.ClientId);
                            }
                            else
                            {
                                GoupAndSalle goupAndSalle1 = new GoupAndSalle()
                                {
                                    ClientIdS = new List<int>()
                                    {
                                        clientInfo.ClientId
                                    },
                                    Name = salle.GR_Contragent,
                                    SumeMonthe = new double[6],
                                    Sume = Convert.ToDouble(salle.Summa.Replace('.', ','))
                            };
                                goupAndSalle1.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                                adminAndSalles.GoupAndSalles.Add(goupAndSalle1);
                            }
                        }
                        else
                        {
                            GoupAndSalle goupAndSalle1 = new GoupAndSalle()
                            {
                                ClientIdS = new List<int>()
                                    {
                                        clientInfo.ClientId
                                    },
                                Name = salle.GR_Contragent,
                                SumeMonthe = new double[6],
                                Sume = Convert.ToDouble(salle.Summa.Replace('.', ','))
                            };
                            goupAndSalle1.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                            AdminAndSalles adminAndSalles1 = new AdminAndSalles()
                            {
                                GoupAndSalles = new List<GoupAndSalle>()
                                {
                                    goupAndSalle1
                                },
                                MangerId = userInfo.Id,
                                Name = salle.Manager,
                                OneCIdM = userInfo.OneCId,
                                Sume = Convert.ToDouble(salle.Summa.Replace('.', ',')),
                                SumeMonthe = new double[6]
                            };
                            adminAndSalles1.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                            adminAndSalless.Add(adminAndSalles1);
                        }
                    }
                    else
                    {
                        AdminAndSalles adminAndSalles = adminAndSalless.FirstOrDefault(m => m.OneCIdM.ToString() == "00000000-0000-0000-0000-000000000000");
                        if (adminAndSalles != null)
                        {
                            adminAndSalles.Sume += Convert.ToDouble(salle.Summa.Replace('.', ','));
                            GoupAndSalle goupAndSalle = adminAndSalles.GoupAndSalles.FirstOrDefault(m => m.Name.ToString() == salle.GR_Contragent);
                            if (goupAndSalle != null)
                            {
                                goupAndSalle.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                                adminAndSalles.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                                goupAndSalle.Sume += Convert.ToDouble(salle.Summa.Replace('.', ','));
                                goupAndSalle.ClientIdS.Add(clientInfo.ClientId);
                            }
                            else
                            {
                                GoupAndSalle goupAndSalle1 = new GoupAndSalle()
                                {
                                    ClientIdS = new List<int>()
                                    {
                                        clientInfo.ClientId
                                    },
                                    Name = salle.GR_Contragent,
                                    SumeMonthe = new double[6],
                                    Sume = Convert.ToDouble(salle.Summa.Replace('.', ','))
                            };
                                goupAndSalle1.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                                adminAndSalles.GoupAndSalles.Add(goupAndSalle1);
                            }
                        }
                        else
                        {
                            GoupAndSalle goupAndSalle1 = new GoupAndSalle()
                            {
                                ClientIdS = new List<int>()
                                    {
                                        clientInfo.ClientId
                                    },
                                Name = salle.GR_Contragent,
                                SumeMonthe = new double[6],
                                Sume = Convert.ToDouble(salle.Summa.Replace('.', ','))
                            };
                            goupAndSalle1.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                            AdminAndSalles adminAndSalles1 = new AdminAndSalles()
                            {
                                GoupAndSalles = new List<GoupAndSalle>()
                                {
                                    goupAndSalle1
                                },
                                MangerId = 0,
                                Name = "Othe",
                                OneCIdM = new Guid("00000000-0000-0000-0000-000000000000"),
                                Sume = Convert.ToDouble(salle.Summa.Replace('.', ',')),
                                SumeMonthe = new double[6]
                            };
                            goupAndSalle1.SumeMonthe[numbermonthe] += Convert.ToDouble(salle.Summa.Replace('.', ','));
                            adminAndSalless.Add(adminAndSalles1);
                        }
                    }
                }
            }
            return adminAndSalless;
        }
    }
}