using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Entities.OneCInfo;
using FluentScheduler;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebUI.Background.Report.Model;

namespace WebUI.Background.Report
{
    public class DebitoryReport : IJob
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_Debitory?$format=json");
        private readonly ApplicationContext _context;

        public DebitoryReport(ApplicationContext context)
        {
            _context = context;
        }

        public void Execute()
        {
            request.UserAgent = "World Sushi";
            System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
            request.Credentials = new NetworkCredential("chuprina.r.v@gmail.com", "123");
            Task.Run(() => WorkDebitory());
        }

        private void WorkDebitory()
        {
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream receiveStream = response.GetResponseStream();
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            string content = readStream.ReadToEnd();
            var responseAppS = JObject.Parse(content);
            List<Debitorka> debitorkas = JsonConvert.DeserializeObject<List<Debitorka>>(responseAppS.
                        SelectToken("value").ToString());
            List<ManagerAndDebitory> managerAndDebitories = SortToMonteAndClients(debitorkas);
            CreatePdf(managerAndDebitories);
        }

        private async void CreatePdf(List<ManagerAndDebitory> managerAndDebitories)
        {
            Document doc = new Document();
            if(!Directory.Exists("PDF/All"))
            {
                Directory.CreateDirectory("PDF/All");
            }
            PdfWriter.GetInstance(doc, new FileStream("PDF/All/Debytory.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(20);
            table.TotalWidth = 590f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now} по долгу", font));
            cell.Colspan = 20;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Контрагент / Договор", font)));
            cell.Colspan = 5;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Документ", font)));
            cell.Colspan = 5;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Допустимое число дней задолжености", font)));
            cell.Colspan = 3;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Число дней до погашения", font)));
            cell.Colspan = 3;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Сумма долга", font)));
            cell.Colspan = 4;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            foreach(ManagerAndDebitory managerAndDebitory in managerAndDebitories)
            {
                CreateManagerPdf(managerAndDebitory);
                font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL, new BaseColor(153, 51, 0));
                cell = new PdfPCell(new Phrase(new Phrase(managerAndDebitory.Name, font)));
                cell.HorizontalAlignment = 1;
                cell.VerticalAlignment = 1;
                cell.BorderWidthRight = 0;
                cell.Colspan = 12;
                table.AddCell(cell);
                if (managerAndDebitory.Sume >= 0)
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                }
                else
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                }
                cell = new PdfPCell(new Phrase(new Phrase(managerAndDebitory.Sume.ToString()+" руб", font)));
                cell.HorizontalAlignment = 2;
                cell.VerticalAlignment = 1;
                cell.Colspan = 8;
                cell.BorderWidthLeft = 0;
                table.AddCell(cell);
                foreach (ClientAndDebitorka clientAndDebitorka in managerAndDebitory.clientAndDebitorkas)
                {
                    CreateClienrPdf(clientAndDebitorka);
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(153, 51, 0));
                    cell = new PdfPCell(new Phrase(new Phrase(clientAndDebitorka.Name, font)));
                    cell.HorizontalAlignment = 0;
                    cell.VerticalAlignment = 1;
                    cell.BorderWidthRight = 0;
                    cell.Colspan = 12;
                    table.AddCell(cell);
                    if (clientAndDebitorka.Sume >= 0)
                    {
                        font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                    }
                    else
                    {
                        font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                    }
                    cell = new PdfPCell(new Phrase(new Phrase(clientAndDebitorka.Sume.ToString() + " руб", font)));
                    cell.HorizontalAlignment = 2;
                    cell.VerticalAlignment = 1;
                    cell.Colspan = 8;
                    cell.BorderWidthLeft = 0;
                    table.AddCell(cell);
                    foreach (Model.Data data in clientAndDebitorka.Datas)
                    {
                        font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                        cell = new PdfPCell(new Phrase(new Phrase(data.Dogovor, font)));
                        cell.HorizontalAlignment = 1;
                        cell.VerticalAlignment = 1;
                        cell.Colspan = 5;
                        table.AddCell(cell);
                        font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                        cell = new PdfPCell(new Phrase(new Phrase(data.Dokument, font)));
                        cell.HorizontalAlignment = 1;
                        cell.VerticalAlignment = 1;
                        cell.Colspan = 5;
                        table.AddCell(cell);
                        font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                        cell = new PdfPCell(new Phrase(new Phrase(data.DopustimoDney.ToString(), font)));
                        cell.HorizontalAlignment = 2;
                        cell.VerticalAlignment = 2;
                        cell.Colspan = 3;
                        table.AddCell(cell);
                        if (data.DneyDoPogashenia >= 0)
                        {
                            font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                        }
                        else
                        {
                            font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                        }
                        cell = new PdfPCell(new Phrase(new Phrase(data.DneyDoPogashenia.ToString(), font)));
                        cell.HorizontalAlignment = 2;
                        cell.VerticalAlignment = 2;
                        cell.Colspan = 3;
                        table.AddCell(cell);
                        if (data.Summa >= 0)
                        {
                            font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                        }
                        else
                        {
                            font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                        }
                        cell = new PdfPCell(new Phrase(new Phrase(data.Summa.ToString() + " руб", font)));
                        cell.HorizontalAlignment = 2;
                        cell.VerticalAlignment = 2;
                        cell.Colspan = 4;
                        table.AddCell(cell);
                    }
                }
            }
            doc.Add(table);
            doc.Close();
        }

        private void CreateClienrPdf(ClientAndDebitorka clientAndDebitorka)
        {
            Document doc = new Document();
            if (!Directory.Exists("PDF/Client"))
            {
                Directory.CreateDirectory("PDF/Client");
            }
            PdfWriter.GetInstance(doc, new FileStream($"PDF/Client/Debytory{clientAndDebitorka.ClientId}.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(20);
            table.TotalWidth = 590f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now} по долгу", font));
            cell.Colspan = 20;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Контрагент / Договор", font)));
            cell.Colspan = 5;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Документ", font)));
            cell.Colspan = 5;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Допустимое число дней задолжености", font)));
            cell.Colspan = 3;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Число дней до погашения", font)));
            cell.Colspan = 3;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Сумма долга", font)));
            cell.Colspan = 4;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell); font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(153, 51, 0));
            cell = new PdfPCell(new Phrase(new Phrase(clientAndDebitorka.Name, font)));
            cell.HorizontalAlignment = 0;
            cell.VerticalAlignment = 1;
            cell.BorderWidthRight = 0;
            cell.Colspan = 12;
            table.AddCell(cell);
            if (clientAndDebitorka.Sume >= 0)
            {
                font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
            }
            else
            {
                font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
            }
            cell = new PdfPCell(new Phrase(new Phrase(clientAndDebitorka.Sume.ToString() + " руб", font)));
            cell.HorizontalAlignment = 2;
            cell.VerticalAlignment = 1;
            cell.Colspan = 8;
            cell.BorderWidthLeft = 0;
            table.AddCell(cell);
            foreach (Model.Data data in clientAndDebitorka.Datas)
            {
                font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                cell = new PdfPCell(new Phrase(new Phrase(data.Dogovor, font)));
                cell.HorizontalAlignment = 1;
                cell.VerticalAlignment = 1;
                cell.Colspan = 5;
                table.AddCell(cell);
                font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                cell = new PdfPCell(new Phrase(new Phrase(data.Dokument, font)));
                cell.HorizontalAlignment = 1;
                cell.VerticalAlignment = 1;
                cell.Colspan = 5;
                table.AddCell(cell);
                font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                cell = new PdfPCell(new Phrase(new Phrase(data.DopustimoDney.ToString(), font)));
                cell.HorizontalAlignment = 2;
                cell.VerticalAlignment = 2;
                cell.Colspan = 3;
                table.AddCell(cell);
                if (data.DneyDoPogashenia >= 0)
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                }
                else
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                }
                cell = new PdfPCell(new Phrase(new Phrase(data.DneyDoPogashenia.ToString(), font)));
                cell.HorizontalAlignment = 2;
                cell.VerticalAlignment = 2;
                cell.Colspan = 3;
                table.AddCell(cell);
                if (data.Summa >= 0)
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                }
                else
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                }
                cell = new PdfPCell(new Phrase(new Phrase(data.Summa.ToString() + " руб", font)));
                cell.HorizontalAlignment = 2;
                cell.VerticalAlignment = 2;
                cell.Colspan = 4;
                table.AddCell(cell);
            }
            doc.Add(table);
            doc.Close();
        }

        private void CreateManagerPdf(ManagerAndDebitory managerAndDebitory)
        {
            Document doc = new Document();
            if (!Directory.Exists("PDF/Manager"))
            {
                Directory.CreateDirectory("PDF/Manager");
            }
            PdfWriter.GetInstance(doc, new FileStream($"PDF/Manager/Debytory{managerAndDebitory.MangerId}.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 10, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(20);
            table.TotalWidth = 590f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Отчёт за {DateTime.Now} по долгу", font));
            cell.Colspan = 20;
            cell.HorizontalAlignment = 0;
            cell.Border = 0;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Контрагент / Договор", font)));
            cell.Colspan = 5;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Документ", font)));
            cell.Colspan = 5;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Допустимое число дней задолжености", font)));
            cell.Colspan = 3;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Число дней до погашения", font)));
            cell.Colspan = 3;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);
            cell = new PdfPCell(new Phrase(new Phrase("Сумма долга", font)));
            cell.Colspan = 4;
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            table.AddCell(cell);

            font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL, new BaseColor(153, 51, 0));
            cell = new PdfPCell(new Phrase(new Phrase(managerAndDebitory.Name, font)));
            cell.HorizontalAlignment = 1;
            cell.VerticalAlignment = 1;
            cell.BorderWidthRight = 0;
            cell.Colspan = 12;
            table.AddCell(cell);
            if (managerAndDebitory.Sume >= 0)
            {
                font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
            }
            else
            {
                font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
            }
            cell = new PdfPCell(new Phrase(new Phrase(managerAndDebitory.Sume.ToString() + " руб", font)));
            cell.HorizontalAlignment = 2;
            cell.VerticalAlignment = 1;
            cell.Colspan = 8;
            cell.BorderWidthLeft = 0;
            table.AddCell(cell);
            foreach (ClientAndDebitorka clientAndDebitorka in managerAndDebitory.clientAndDebitorkas)
            {

                font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(153, 51, 0));
                cell = new PdfPCell(new Phrase(new Phrase(clientAndDebitorka.Name, font)));
                cell.HorizontalAlignment = 0;
                cell.VerticalAlignment = 1;
                cell.BorderWidthRight = 0;
                cell.Colspan = 12;
                table.AddCell(cell);
                if (clientAndDebitorka.Sume >= 0)
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                }
                else
                {
                    font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                }
                cell = new PdfPCell(new Phrase(new Phrase(clientAndDebitorka.Sume.ToString() + " руб", font)));
                cell.HorizontalAlignment = 2;
                cell.VerticalAlignment = 1;
                cell.Colspan = 8;
                cell.BorderWidthLeft = 0;
                table.AddCell(cell);
                foreach (Model.Data data in clientAndDebitorka.Datas)
                {
                    font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                    cell = new PdfPCell(new Phrase(new Phrase(data.Dogovor, font)));
                    cell.HorizontalAlignment = 1;
                    cell.VerticalAlignment = 1;
                    cell.Colspan = 5;
                    table.AddCell(cell);
                    font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                    cell = new PdfPCell(new Phrase(new Phrase(data.Dokument, font)));
                    cell.HorizontalAlignment = 1;
                    cell.VerticalAlignment = 1;
                    cell.Colspan = 5;
                    table.AddCell(cell);
                    font = new iTextSharp.text.Font(baseFont, 8, iTextSharp.text.Font.NORMAL);
                    cell = new PdfPCell(new Phrase(new Phrase(data.DopustimoDney.ToString(), font)));
                    cell.HorizontalAlignment = 2;
                    cell.VerticalAlignment = 2;
                    cell.Colspan = 3;
                    table.AddCell(cell);
                    if (data.DneyDoPogashenia >= 0)
                    {
                        font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                    }
                    else
                    {
                        font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                    }
                    cell = new PdfPCell(new Phrase(new Phrase(data.DneyDoPogashenia.ToString(), font)));
                    cell.HorizontalAlignment = 2;
                    cell.VerticalAlignment = 2;
                    cell.Colspan = 3;
                    table.AddCell(cell);
                    if (data.Summa >= 0)
                    {
                        font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL);
                    }
                    else
                    {
                        font = new iTextSharp.text.Font(baseFont, 9, iTextSharp.text.Font.NORMAL, new BaseColor(223, 1, 58));
                    }
                    cell = new PdfPCell(new Phrase(new Phrase(data.Summa.ToString() + " руб", font)));
                    cell.HorizontalAlignment = 2;
                    cell.VerticalAlignment = 2;
                    cell.Colspan = 4;
                    table.AddCell(cell);
                }
            }
            doc.Add(table);
            doc.Close();
        }

        private List<ManagerAndDebitory> SortToMonteAndClients(List<Debitorka> debitorkas)
        {
            List<ManagerAndDebitory> managerAndDebitories = new List<ManagerAndDebitory>();
            List<ClientInfo> clientInfos = _context.Set<ClientInfo>().ToList();
            List<UserInfo> userInfos = _context.Set<UserInfo>().ToList();
            foreach (Debitorka debitorka in debitorkas)
            {
                ClientInfo clientInfo = clientInfos.FirstOrDefault(c => c.OneCId.ToString() == debitorka.Contragent_ID);
                UserInfo userInfo = userInfos.FirstOrDefault(u => u.OneCId.ToString() == debitorka.Manager_ID);
                if (userInfo != null)
                {
                    ManagerAndDebitory managerAndDebitory = managerAndDebitories.FirstOrDefault(m => m.OneCIdM.ToString() == debitorka.Manager_ID);
                    if (managerAndDebitory != null)
                    {
                        managerAndDebitory.Sume += Convert.ToDouble(debitorka.Summa.Replace('.', ','));
                        ClientAndDebitorka clientAndDebitorka = managerAndDebitory.clientAndDebitorkas.FirstOrDefault(c => c.OneCId.ToString() == debitorka.Contragent_ID);
                        if (clientAndDebitorka != null)
                        {
                            clientAndDebitorka.Sume += Convert.ToDouble(debitorka.Summa.Replace('.', ','));
                            clientAndDebitorka.Datas.Add(new Model.Data()
                            {
                                DneyDoPogashenia = Convert.ToInt32(debitorka.DneyDoPogashenia),
                                Dogovor = debitorka.Dogovor,
                                Dokument = debitorka.Dokument,
                                DopustimoDney = Convert.ToInt32(debitorka.DopustimoDney),
                                Summa = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                            });
                        }
                        else
                        {
                            managerAndDebitory.clientAndDebitorkas.Add(new ClientAndDebitorka()
                            {
                                ClientId = clientInfo != null ? clientInfo.ClientId : 0,
                                OneCId = new Guid(debitorka.Contragent_ID),
                                Datas = new List<Model.Data>()
                                {
                                    new Model.Data()
                                    {
                                        DneyDoPogashenia = Convert.ToInt32(debitorka.DneyDoPogashenia),
                                        Dogovor = debitorka.Dogovor,
                                        Dokument = debitorka.Dokument,
                                        DopustimoDney = Convert.ToInt32(debitorka.DopustimoDney),
                                        Summa = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                                    }
                                },
                                Name = debitorka.Contragent,
                                Sume = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                        });
                        }
                    }
                    else
                    {
                        managerAndDebitories.Add(new ManagerAndDebitory()
                        {
                            clientAndDebitorkas = new List<ClientAndDebitorka>()
                            {
                                new ClientAndDebitorka()
                                {
                                    ClientId = clientInfo != null ? clientInfo.ClientId : 0,
                                    OneCId = new Guid(debitorka.Contragent_ID),
                                    Datas = new List<Model.Data>()
                                    {
                                        new Model.Data()
                                        {
                                            DneyDoPogashenia = Convert.ToInt32(debitorka.DneyDoPogashenia),
                                            Dogovor = debitorka.Dogovor,
                                            Dokument = debitorka.Dokument,
                                            DopustimoDney = Convert.ToInt32(debitorka.DopustimoDney),
                                            Summa = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                                        }
                                    },
                                    Sume = Convert.ToDouble(debitorka.Summa.Replace('.', ',')),
                                    Name = debitorka.Contragent,
                                }
                            },
                            MangerId = userInfo != null ? userInfo.UserId : 0,
                            OneCIdM = userInfo.OneCId,
                            Name = debitorka.Manager,
                            Sume = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                        });
                    }
                }
                else
                {
                    ManagerAndDebitory managerAndDebitory = managerAndDebitories.FirstOrDefault(m => m.OneCIdM.ToString() == "00000000-0000-0000-0000-000000000000");
                    if (managerAndDebitory != null)
                    {
                        managerAndDebitory.Sume += Convert.ToDouble(debitorka.Summa.Replace('.', ','));
                        ClientAndDebitorka clientAndDebitorka = managerAndDebitory.clientAndDebitorkas.FirstOrDefault(c => c.OneCId.ToString() == debitorka.Contragent_ID);
                        if (clientAndDebitorka != null)
                        {
                            clientAndDebitorka.Sume += Convert.ToDouble(debitorka.Summa.Replace('.', ','));
                            clientAndDebitorka.Datas.Add(new Model.Data()
                            {
                                DneyDoPogashenia = Convert.ToInt32(debitorka.DneyDoPogashenia),
                                Dogovor = debitorka.Dogovor,
                                Dokument = debitorka.Dokument,
                                DopustimoDney = Convert.ToInt32(debitorka.DopustimoDney),
                                Summa = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                            });
                        }
                        else
                        {
                            managerAndDebitory.clientAndDebitorkas.Add(new ClientAndDebitorka()
                            {
                                ClientId = clientInfo != null ? clientInfo.ClientId : 0,
                                OneCId = new Guid(debitorka.Contragent_ID),
                                Datas = new List<Model.Data>()
                                {
                                    new Model.Data()
                                    {
                                        DneyDoPogashenia = Convert.ToInt32(debitorka.DneyDoPogashenia),
                                        Dogovor = debitorka.Dogovor,
                                        Dokument = debitorka.Dokument,
                                        DopustimoDney = Convert.ToInt32(debitorka.DopustimoDney),
                                        Summa = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                                    }
                                },
                                Name = debitorka.Contragent,
                                Sume = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                            });
                        }
                    }
                    else
                    {
                        managerAndDebitories.Add(new ManagerAndDebitory()
                        {
                            clientAndDebitorkas = new List<ClientAndDebitorka>()
                            {
                                new ClientAndDebitorka()
                                {
                                    ClientId = clientInfo != null ? clientInfo.ClientId : 0,
                                    OneCId = new Guid(debitorka.Contragent_ID),
                                    Datas = new List<Model.Data>()
                                    {
                                        new Model.Data()
                                        {
                                            DneyDoPogashenia = Convert.ToInt32(debitorka.DneyDoPogashenia),
                                            Dogovor = debitorka.Dogovor,
                                            Dokument = debitorka.Dokument,
                                            DopustimoDney = Convert.ToInt32(debitorka.DopustimoDney),
                                            Summa = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                                        }
                                    },
                                    Name = debitorka.Contragent,
                                    Sume = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                                }
                            },
                            MangerId = 0,
                            OneCIdM = new Guid("00000000-0000-0000-0000-000000000000"),
                            Name = "Othe",
                            Sume = Convert.ToDouble(debitorka.Summa.Replace('.', ','))
                        });
                    }
                }
            }
            return managerAndDebitories;
        }
    }
}