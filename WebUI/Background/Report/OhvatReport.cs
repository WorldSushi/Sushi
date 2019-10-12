
using Data;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Data.Enums;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using FluentScheduler;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WebUI.Background.Report.Model.OhvatShablon;

namespace WebUI.Background.Report
{
    public class OhvatReport : IJob
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_OhvatShablon?$format=json");
        private readonly ApplicationContext _context;

        public OhvatReport(ApplicationContext context)
        {
            _context = context;
        }

        public void Execute()
        {
            request.UserAgent = "World Sushi";
            ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
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
            List<OhvatModel> ohvatModels = JsonConvert.DeserializeObject<List<OhvatModel>>(responseAppS.
                        SelectToken("value").ToString()).
                        Where(s => DateTime.Parse(s.Period) >= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1)).ToList();
            Dictionary<string, List<OhvatModel>> ohvats = SortToManager(ohvatModels);
            CreateXsml(ohvats);
        }

        private void CreateXsml(Dictionary<string, List<OhvatModel>> ohvats)
        {
            foreach (string id in ohvats.Keys)
            {
                if (!Directory.Exists("PDF/Manager"))
                {
                    Directory.CreateDirectory("PDF/Manager");
                }
                Data.Entities.OneCInfo.UserInfo userInfo = _context.Set<Data.Entities.OneCInfo.UserInfo>().FirstOrDefault(c => c.OneCId.ToString() == id);
                if(userInfo == null)
                {
                    continue;
                }
                SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.
                Create($"PDF/Manager/Oxvat{userInfo.UserId}.xlsx", SpreadsheetDocumentType.Workbook);
                WorkbookPart workbookpart = spreadsheetDocument.AddWorkbookPart();
                workbookpart.Workbook = new Workbook();
                WorksheetPart worksheetPart = workbookpart.AddNewPart<WorksheetPart>();
                worksheetPart.Worksheet = new Worksheet(new SheetData());
                Sheets sheets = spreadsheetDocument.WorkbookPart.Workbook.
                    AppendChild<Sheets>(new Sheets());
                WorkbookStylesPart stylePart = workbookpart.AddNewPart<WorkbookStylesPart>();
                stylePart.Stylesheet = GenerateStylesheet();
                stylePart.Stylesheet.Save();
                Sheet sheet = new Sheet()
                {
                    Id = spreadsheetDocument.WorkbookPart.
                    GetIdOfPart(worksheetPart),
                    SheetId = 1,
                    Name = "mySheet"
                };
                sheets.Append(sheet);
                int i = 0;
                CreatHeadXSML(spreadsheetDocument, ref i, worksheetPart);
                CreatBody(spreadsheetDocument, ref i, worksheetPart, ohvats.GetValueOrDefault(id), userInfo);
                worksheetPart.Worksheet.Save();
                spreadsheetDocument.Close();
            }
        }

        private void CreatBody(SpreadsheetDocument spreadsheetDocument, ref int i, WorksheetPart worksheetPart, List<OhvatModel> ohvatModels, Data.Entities.OneCInfo.UserInfo userInfo)
        {
            SharedStringTablePart shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
            int j = 0;
            foreach(OhvatModel ohvatModel in ohvatModels)
            {
                ClientInfo clientInfo = _context.Set<ClientInfo>()
                    .FirstOrDefault(c => c.OneCId.ToString() == ohvatModel.Contragent_ID);
                Client client = _context.Set<Client>()
                    .FirstOrDefault(c => clientInfo != null && c.Id == clientInfo.ClientId);

                if (client != null)
                {
                    List<ClientPhone> clientPhones = _context.Set<ClientPhone>()
                        .Where(c => c.ClientId == client.Id).ToList();
                    string nameColummn = GetCharOfTabel(1);
                    InsertSharedStringItem(ohvatModel.Contragent, shareStringPart);
                    Cell cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 4, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    nameColummn = GetCharOfTabel(2);
                    InsertSharedStringItem(ohvatModel.Contragent, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 4, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    if (clientPhones != null && clientPhones.Count != 0)
                    {
                        nameColummn = GetCharOfTabel(3);
                        InsertSharedStringItem(clientPhones[0].Phone, shareStringPart);
                        cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 4, 30);
                        cell.CellValue = new CellValue(i.ToString());
                        cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                        worksheetPart.Worksheet.Save();
                        i++;
                        if (clientPhones.Count > 1)
                        {
                            nameColummn = GetCharOfTabel(4);
                            InsertSharedStringItem(clientPhones[1].Phone, shareStringPart);
                            cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 4, 30);
                            cell.CellValue = new CellValue(i.ToString());
                            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                            worksheetPart.Worksheet.Save();
                            i++;
                        }
                    }
                    string clietType = client.ClientType == ClientTypes.WithoutType ? "Без типа" : client.ClientType == ClientTypes.Small ? "Небольшой" : client.ClientType == ClientTypes.Middle1 ? "Средний 1" :
                         client.ClientType == ClientTypes.Middle2 ? "Средний 2" : client.ClientType == ClientTypes.Large1 ? "Крупный 1" : client.ClientType == ClientTypes.Large2 ? "Крупный 2" :
                          client.ClientType == ClientTypes.Large3 ? "Крупный 3" : client.ClientType == ClientTypes.VeryLarge ? "Очень крупный" : "";
                    nameColummn = GetCharOfTabel(5);
                    InsertSharedStringItem(clietType, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 4, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    string numberOfShipments = client.NumberOfShipments == NumberOfShipments.WithoutType ? "Не указан" : client.NumberOfShipments == NumberOfShipments.OnePerMonth ? "1 раз в месяц" : client.NumberOfShipments == NumberOfShipments.OnePerTwoWeek ? "1 раз в 2 недели" :
                         client.NumberOfShipments == NumberOfShipments.ThreePerMonth ? "1 раз в неделю" : client.NumberOfShipments == NumberOfShipments.FivePerMonth ? "5 раз в месяц" : client.NumberOfShipments == NumberOfShipments.SixPerMonth ? "6 раз в месяц" :
                         client.NumberOfShipments == NumberOfShipments.TwoPerWeek ? "2 раза в неделю"  : "";
                    nameColummn = GetCharOfTabel(6);
                    InsertSharedStringItem(clietType, shareStringPart);
                    cell = InsertCellInWorksheet(numberOfShipments, (uint)j + 9, worksheetPart, 4, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    string numberOfCalls = client.NumberOfCalls == NumberOfCalls.WithoutType ? "Не указан" : client.NumberOfCalls == NumberOfCalls.OnePerMonth ? "1 раз в месяц" : client.NumberOfCalls == NumberOfCalls.OnePerTwoWeek ? "1 раз в 2 недели" :
                          client.NumberOfCalls == NumberOfCalls.ThreePerMonth ? "1 раз в неделю" : client.NumberOfCalls == NumberOfCalls.FivePerMonth ? "5 раз в месяц" : client.NumberOfCalls == NumberOfCalls.SixPerMonth ? "6 раз в месяц" :
                          client.NumberOfCalls == NumberOfCalls.TwoPerWeek ? "2 раза в неделю" : "";
                    nameColummn = GetCharOfTabel(7);
                    InsertSharedStringItem(numberOfCalls, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 4, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;

                    nameColummn = GetCharOfTabel(8);
                    InsertSharedStringItem(ohvatModel.KolNom, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, (uint)GetIdStyles(Convert.ToDouble(ohvatModel.KolNom), Convert.ToDouble(ohvatModel.KolNomPred)), 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    nameColummn = GetCharOfTabel(9);
                    InsertSharedStringItem(ohvatModel.KolNom_5, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, (uint)GetIdStyles(Convert.ToDouble(ohvatModel.KolNom_5), Convert.ToDouble(ohvatModel.KolNom_5Pred)), 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    nameColummn = GetCharOfTabel(10);
                    InsertSharedStringItem(ohvatModel.KolNomPred, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 12, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    nameColummn = GetCharOfTabel(11);
                    InsertSharedStringItem(ohvatModel.KolNom_5Pred, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 12, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;

                    nameColummn = GetCharOfTabel(12);
                    InsertSharedStringItem(ohvatModel.Summa, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, (uint)GetIdStyles(Convert.ToDouble(ohvatModel.Summa.Replace('.', ',')), Convert.ToDouble(ohvatModel.SummaPred.Replace('.', ','))), 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    nameColummn = GetCharOfTabel(13);
                    InsertSharedStringItem(ohvatModel.Summa_5, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, (uint)GetIdStyles(Convert.ToDouble(ohvatModel.Summa_5.Replace('.', ',')), Convert.ToDouble(ohvatModel.Summa_5Pred.Replace('.', ','))), 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    nameColummn = GetCharOfTabel(14);
                    InsertSharedStringItem(ohvatModel.SummaPred, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 12, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;
                    nameColummn = GetCharOfTabel(15);
                    InsertSharedStringItem(ohvatModel.Summa_5Pred, shareStringPart);
                    cell = InsertCellInWorksheet(nameColummn, (uint)j + 9, worksheetPart, 12, 30);
                    cell.CellValue = new CellValue(i.ToString());
                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    worksheetPart.Worksheet.Save();
                    i++;

                    j++;
                }
            }
        }

        private int GetIdStyles(double fNum, double sNum)
        {
            int idStyle = 5;
            double precent = (fNum / sNum) * 100;
            if(precent >= 125)
            {
                idStyle = 5;
            }
            else if(precent >= 100 && precent <= 124)
            {
                idStyle = 6;
            }
            else if (precent >= 75 && precent <= 99)
            {
                idStyle = 7;
            }
            else if (precent >= 50 && precent <= 74)
            {
                idStyle = 8;
            }
            else if (precent >= 25 && precent <= 49)
            {
                idStyle = 9;
            }
            else if (precent >= 1 && precent <= 24)
            {
                idStyle = 10;
            }
            else if (precent <= 0)
            {
                idStyle = 11;
            }
            return idStyle;
        }

        private void CreatHeadXSML(SpreadsheetDocument spreadsheetDocument, ref int i, WorksheetPart worksheetPart)
        {
            SharedStringTablePart shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
            string nameColummn = GetCharOfTabel(1);
            InsertSharedStringItem("Названия закрепленных Клиентов", shareStringPart);
            Cell cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 50);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{nameColummn + 5}:{nameColummn + 8}");
            nameColummn = GetCharOfTabel(2);
            InsertSharedStringItem("Юр. лица", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 50);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{nameColummn + 5}:{nameColummn + 8}");
            nameColummn = GetCharOfTabel(3);
            InsertSharedStringItem("Телефон 1", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 50);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{nameColummn + 5}:{nameColummn + 8}");
            nameColummn = GetCharOfTabel(4);
            InsertSharedStringItem("Телефон 2", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 50);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{nameColummn + 5}:{nameColummn + 8}");
            nameColummn = GetCharOfTabel(5);
            InsertSharedStringItem("Типы Клиентов", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 50);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{nameColummn + 5}:{nameColummn + 8}");
            nameColummn = GetCharOfTabel(6);
            InsertSharedStringItem("Период-ть отгрузок", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 50);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{nameColummn + 5}:{nameColummn + 8}");
            nameColummn = GetCharOfTabel(7);
            InsertSharedStringItem("Требуемая период-ть звонков", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 50);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{nameColummn + 5}:{nameColummn + 8}");

            nameColummn = GetCharOfTabel(8);
            InsertSharedStringItem("Анализ по номенклатурере", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(8) + 5}:{GetCharOfTabel(11) + 5}");
            nameColummn = GetCharOfTabel(12);
            InsertSharedStringItem("Анализ по выручке", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 5, worksheetPart, 2, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(12) + 5}:{GetCharOfTabel(15) + 5}");

            nameColummn = GetCharOfTabel(8);
            InsertSharedStringItem("отчетный месяц", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 6, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(8) + 6}:{GetCharOfTabel(9) + 6}");
            nameColummn = GetCharOfTabel(8);
            InsertSharedStringItem("относительно", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 7, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(8) + 7}:{GetCharOfTabel(9) + 7}");
            nameColummn = GetCharOfTabel(8);
            InsertSharedStringItem("Предыд. месяца", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 8, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            nameColummn = GetCharOfTabel(9);
            InsertSharedStringItem("среднего по предыд. 5ти мес.", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 8, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;

            nameColummn = GetCharOfTabel(10);
            InsertSharedStringItem("Предыд. месяц", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 6, worksheetPart, 3, 40);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(10) + 6}:{GetCharOfTabel(10) + 8}");
            nameColummn = GetCharOfTabel(11);
            InsertSharedStringItem("В среднем по предыд. 5ти мес.", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 6, worksheetPart, 3, 40);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(11) + 6}:{GetCharOfTabel(11) + 8}");

            nameColummn = GetCharOfTabel(12);
            InsertSharedStringItem("отчетный месяц", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 6, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(12) + 6}:{GetCharOfTabel(13) + 6}");
            nameColummn = GetCharOfTabel(12);
            InsertSharedStringItem("относительно", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 7, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(12) + 7}:{GetCharOfTabel(13) + 7}");
            nameColummn = GetCharOfTabel(12);
            InsertSharedStringItem("Предыд. месяца", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 8, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            nameColummn = GetCharOfTabel(13);
            InsertSharedStringItem("среднего по предыд. 5ти мес.", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 8, worksheetPart, 3, 30);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;

            nameColummn = GetCharOfTabel(14);
            InsertSharedStringItem("Предыд. месяц", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 6, worksheetPart, 3, 40);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(14) + 6}:{GetCharOfTabel(14) + 8}");
            nameColummn = GetCharOfTabel(15);
            InsertSharedStringItem("В среднем по предыд. 5ти мес.", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 6, worksheetPart, 3, 40);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            MergeTwoCells(worksheetPart.Worksheet, $"{GetCharOfTabel(15) + 6}:{GetCharOfTabel(15) + 8}");
        }

        private static void MergeTwoCells(Worksheet worksheet, string stringValue)
        {
            MergeCells mergeCells;
            if (worksheet.Elements<MergeCells>().Count() > 0)
            {
                mergeCells = worksheet.Elements<MergeCells>().First();
            }
            else
            {
                mergeCells = new MergeCells();

                // Insert a MergeCells object into the specified position.
                if (worksheet.Elements<CustomSheetView>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<CustomSheetView>().First());
                }
                else if (worksheet.Elements<DataConsolidate>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<DataConsolidate>().First());
                }
                else if (worksheet.Elements<SortState>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<SortState>().First());
                }
                else if (worksheet.Elements<AutoFilter>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<AutoFilter>().First());
                }
                else if (worksheet.Elements<Scenarios>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<Scenarios>().First());
                }
                else if (worksheet.Elements<ProtectedRanges>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<ProtectedRanges>().First());
                }
                else if (worksheet.Elements<SheetProtection>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetProtection>().First());
                }
                else if (worksheet.Elements<SheetCalculationProperties>().Count() > 0)
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetCalculationProperties>().First());
                }
                else
                {
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetData>().First());
                }
            }

            // Create the merged cell and append it to the MergeCells collection.
            MergeCell mergeCell = new MergeCell() { Reference = new StringValue(stringValue) };
            mergeCells.Append(mergeCell);

            worksheet.Save();
        }

        private Cell InsertCellInWorksheet(string columnName, uint rowIndex, WorksheetPart worksheetPart, UInt32 stleIndex, double height)
        {
            Worksheet worksheet = worksheetPart.Worksheet;
            SheetData sheetData = worksheet.GetFirstChild<SheetData>();
            string cellReference = columnName + rowIndex;
            Row row;
            if (sheetData.Elements<Row>().Where(r => r.RowIndex == rowIndex).Count() != 0)
            {
                row = sheetData.Elements<Row>().Where(r => r.RowIndex == rowIndex).First();
            }
            else
            {
                row = new Row() { RowIndex = rowIndex };
                row.CustomHeight = true;
                row.Height = height;
                sheetData.Append(row);
            }
            if (row.Elements<Cell>().Where(c => c.CellReference.Value == columnName + rowIndex).Count() > 0)
            {
                return row.Elements<Cell>().Where(c => c.CellReference.Value == cellReference).First();
            }
            else
            {
                Cell refCell = null;
                foreach (Cell cell in row.Elements<Cell>())
                {
                    if (cell.CellReference.Value.Length == cellReference.Length)
                    {
                        if (string.Compare(cell.CellReference.Value, cellReference, true) > 0)
                        {
                            refCell = cell;
                            break;
                        }
                    }
                }

                Cell newCell = new Cell() { CellReference = cellReference };
                newCell.StyleIndex = stleIndex;
                row.InsertBefore(newCell, refCell);
                worksheet.Save();
                return newCell;
            }
        }

        private SharedStringTablePart GetSharedStringTablePart(WorkbookPart workbookPart)
        {
            SharedStringTablePart shareStringPart = null;
            if (workbookPart.GetPartsOfType<SharedStringTablePart>().Count() > 0)
            {
                shareStringPart = workbookPart.GetPartsOfType<SharedStringTablePart>().First();
            }
            else
            {
                shareStringPart = workbookPart.AddNewPart<SharedStringTablePart>();
            }
            return shareStringPart;
        }


        private string GetCharOfTabel(int indexColummmn)
        {
            string charTabel = null;
            List<int> numberChars = new List<int>();
            while (indexColummmn > 25)
            {
                int ost = indexColummmn - 26;
                numberChars.Add(ost);
                indexColummmn = ost;
            }
            if (numberChars.Count != 0)
            {
                charTabel += GetChar(numberChars.Count - 1);
            }
            else
            {
                charTabel += GetChar(indexColummmn);
            }
            foreach (int numberChar in numberChars)
            {
                charTabel += GetChar(numberChar);
            }
            return charTabel;
        }

        private string GetChar(int number)
        {
            string charT = null;
            switch (number)
            {
                case 0:
                    {
                        charT = "A";
                        break;
                    }
                case 1:
                    {
                        charT = "B";
                        break;
                    }
                case 2:
                    {
                        charT = "C";
                        break;
                    }
                case 3:
                    {
                        charT = "D";
                        break;
                    }
                case 4:
                    {
                        charT = "E";
                        break;
                    }
                case 5:
                    {
                        charT = "F";
                        break;
                    }
                case 6:
                    {
                        charT = "G";
                        break;
                    }
                case 7:
                    {
                        charT = "H";
                        break;
                    }
                case 8:
                    {
                        charT = "I";
                        break;
                    }
                case 9:
                    {
                        charT = "J";
                        break;
                    }
                case 10:
                    {
                        charT = "K";
                        break;
                    }
                case 11:
                    {
                        charT = "L";
                        break;
                    }
                case 12:
                    {
                        charT = "M";
                        break;
                    }
                case 13:
                    {
                        charT = "N";
                        break;
                    }
                case 14:
                    {
                        charT = "O";
                        break;
                    }
                case 15:
                    {
                        charT = "P";
                        break;
                    }
                case 16:
                    {
                        charT = "Q";
                        break;
                    }
                case 17:
                    {
                        charT = "R";
                        break;
                    }
                case 18:
                    {
                        charT = "S";
                        break;
                    }
                case 19:
                    {
                        charT = "T";
                        break;
                    }
                case 20:
                    {
                        charT = "U";
                        break;
                    }
                case 21:
                    {
                        charT = "V";
                        break;
                    }
                case 22:
                    {
                        charT = "W";
                        break;
                    }
                case 23:
                    {
                        charT = "X";
                        break;
                    }
                case 24:
                    {
                        charT = "Y";
                        break;
                    }
                case 25:
                    {
                        charT = "Z";
                        break;
                    }
            }
            return charT;
        }

        private void InsertSharedStringItem(string text, SharedStringTablePart shareStringPart)
        {
            if (shareStringPart.SharedStringTable == null)
            {
                shareStringPart.SharedStringTable = new SharedStringTable();
            }
            shareStringPart.SharedStringTable.Append(new SharedStringItem(new DocumentFormat.OpenXml.Spreadsheet.Text(text)));
            shareStringPart.SharedStringTable.Save();
        }

        private Stylesheet GenerateStylesheet()
        {
            Stylesheet styleSheet = null;

            Fills fills = new Fills(
                    new Fill(new PatternFill() { PatternType = PatternValues.None }),
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#ccffff") }) { PatternType = PatternValues.Solid }),
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#F5F6CE") }) { PatternType = PatternValues.Solid }),

                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#66ffff") }) { PatternType = PatternValues.Solid }), //Blue
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#33cc33") }) { PatternType = PatternValues.Solid }), //Dark Green
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#66ff66") }) { PatternType = PatternValues.Solid }), //Green 
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#ffcccc") }) { PatternType = PatternValues.Solid }), //purpur
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#ffff00") }) { PatternType = PatternValues.Solid }), //Yealow
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#ff9933") }) { PatternType = PatternValues.Solid }), //Orange
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#ff0000") }) { PatternType = PatternValues.Solid })  //Red 
                );

            Borders borders = new Borders(
                    new Border(
                        new LeftBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new RightBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new TopBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new BottomBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new DiagonalBorder())
                );

            Fonts font = new Fonts(
                new Font(),
                new Font() { Bold = new Bold(), FontSize = new FontSize() { Val = 18} },
                new Font() { Bold = new Bold(), FontSize = new FontSize() { Val = 13} },
                new Font() { Bold = new Bold(), FontSize = new FontSize() { Val = 10} }
                );

            CellFormats cellFormats = new CellFormats(
                new CellFormat
                {
                    FillId = 0,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 0
                },
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Center),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = false
                    },
                    FillId = 1,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 1
                },
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Center),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 1,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 2
                },
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Center),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 1,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 2,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 3,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },//Blue
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 4,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },//Dark Green
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 5,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },//Green
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 6,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },//purpur
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 7,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },//Yealow
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 8,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },//Orange
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 9,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                },//Red
                new CellFormat
                {
                    Alignment = new Alignment()
                    {
                        Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                        Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                        WrapText = true
                    },
                    FillId = 0,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 3
                } //White
            );

            styleSheet = new Stylesheet(font, fills, borders, cellFormats);

            return styleSheet;
        }

        private Dictionary<string, List<OhvatModel>> SortToManager(List<OhvatModel> ohvatModels)
        {
            Dictionary<string, List<OhvatModel>> ohvats = new Dictionary<string, List<OhvatModel>>();
            foreach(OhvatModel ohvatModel in ohvatModels)
            {
                if(ohvats.ContainsKey(ohvatModel.Manager_ID))
                {
                    ohvats.GetValueOrDefault(ohvatModel.Manager_ID).Add(ohvatModel);
                }
                else
                {
                    ohvats.Add(ohvatModel.Manager_ID, new List<OhvatModel>()
                    {
                        ohvatModel
                    });
                }
            }
            return ohvats;
        }
    }
}