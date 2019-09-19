using Data;
using Data.Entities.OneCInfo;
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
using WebUI.Background.Report.Model;
using WebUI.Background.Report.Model.Shahmatka;

namespace WebUI.Background.Report
{
    public class ShahMatReport : IJob
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_ShahMat?$format=json");
        private ApplicationContext _context;

        public ShahMatReport(ApplicationContext context)
        {
            _context = context;
        }

        public void Execute()
        {
            request.UserAgent = "World Sushi";
            System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
            request.Credentials = new NetworkCredential("chuprina.r.v@gmail.com", "123");
            Task.Run(() => WorkShahMat());
        }

        private void WorkShahMat()
        {
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream receiveStream = response.GetResponseStream();
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            string content = readStream.ReadToEnd();
            var responseAppS = JObject.Parse(content);
            List<ShahmatcaModel> shahmatcaModels = JsonConvert.DeserializeObject<List<ShahmatcaModel>>(responseAppS.
                       SelectToken("value").ToString());
            shahmatcaModels = shahmatcaModels.Where(s => DateTime.Parse(s.Period) >= new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1)).ToList();
            List<ColummnNoklName> colummnNoklNames = GetColummn(shahmatcaModels);
            List<RowManagerContrAgGr> rowManagerContrAgGrs = GetRows(shahmatcaModels);
            CreateCountXsml(colummnNoklNames, rowManagerContrAgGrs);
        }

        private void CreateCountXsml(List<ColummnNoklName> colummnNoklNames, List<RowManagerContrAgGr> rowManagerContrAgGrs)
        {
            if (!Directory.Exists("PDF/All"))
            {
                Directory.CreateDirectory("PDF/All");
            }
            SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.
            Create("PDF/All/shahmat.xsml", SpreadsheetDocumentType.Workbook);
            WorkbookPart workbookpart = spreadsheetDocument.AddWorkbookPart();
            workbookpart.Workbook = new Workbook();
            WorksheetPart worksheetPart = workbookpart.AddNewPart<WorksheetPart>();
            worksheetPart.Worksheet = new Worksheet(new SheetData());
            Sheets sheets = spreadsheetDocument.WorkbookPart.Workbook.
                AppendChild<Sheets>(new Sheets());
            Sheet sheet = new Sheet()
            {
                Id = spreadsheetDocument.WorkbookPart.
                GetIdOfPart(worksheetPart),
                SheetId = 1,
                Name = "mySheet"
            };
            sheets.Append(sheet);
            workbookpart.Workbook.Save();
            SharedStringTablePart shareStringPart;
            if (spreadsheetDocument.WorkbookPart.GetPartsOfType<SharedStringTablePart>().Count() > 0)
            {
                shareStringPart = spreadsheetDocument.WorkbookPart.GetPartsOfType<SharedStringTablePart>().First();
            }
            else
            {
                shareStringPart = spreadsheetDocument.WorkbookPart.AddNewPart<SharedStringTablePart>();
            }
            char s = Convert.ToChar(3);
            int index = InsertSharedStringItem("222", shareStringPart);
            Cell cell = InsertCellInWorksheet("A", 3, worksheetPart);
            cell.CellValue = new CellValue(index.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);


            worksheetPart.Worksheet.Save();
            spreadsheetDocument.Close();
        }



        private int InsertSharedStringItem(string text, SharedStringTablePart shareStringPart)
        {
            if (shareStringPart.SharedStringTable == null)
            {
                shareStringPart.SharedStringTable = new SharedStringTable();
            }
            int i = 0;
            foreach (SharedStringItem item in shareStringPart.SharedStringTable.Elements<SharedStringItem>())
            {
                if (item.InnerText == text)
                {
                    return i;
                }

                i++;
            }
            shareStringPart.SharedStringTable.AppendChild(new SharedStringItem(new DocumentFormat.OpenXml.Spreadsheet.Text(text)));
            shareStringPart.SharedStringTable.Save();

            return i;
        }

        private Cell InsertCellInWorksheet(string columnName, uint rowIndex, WorksheetPart worksheetPart)
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
                row.InsertBefore(newCell, refCell);
                worksheet.Save();
                return newCell;
            }
        }

        private List<RowManagerContrAgGr> GetRows(List<ShahmatcaModel> shahmatcaModels)
        {
            int numberRow = 1;
            List<ClientInfo> clientInfos = _context.Set<ClientInfo>().ToList();
            List<Data.Entities.OneCInfo.UserInfo> userInfos = _context.Set<Data.Entities.OneCInfo.UserInfo>().ToList();
            List<RowManagerContrAgGr> rowManagerContrAgGrs = new List<RowManagerContrAgGr>();
            foreach (ShahmatcaModel shahmatcaModel in shahmatcaModels)
            {
                ClientInfo clientInfo = clientInfos.FirstOrDefault(c => c.OneCId.ToString() == shahmatcaModel.Contragent_ID);
                Data.Entities.OneCInfo.UserInfo userInfo = userInfos.FirstOrDefault(u => u.OneCId.ToString() == shahmatcaModel.Manager_ID);
                if(clientInfo != null && userInfo != null)
                {
                    RowManagerContrAgGr rowManagerContrAgGr = rowManagerContrAgGrs.FirstOrDefault(r => r.Contragent_ID == shahmatcaModel.Contragent_ID);
                    if(rowManagerContrAgGr == null)
                    {
                        rowManagerContrAgGrs.Add(new RowManagerContrAgGr()
                        {
                            Contragent = shahmatcaModel.Contragent,
                            Contragent_ID = shahmatcaModel.Contragent_ID,
                            GR_Contragent =  shahmatcaModel.GR_Contragent,
                            Manager = shahmatcaModel.Manager,
                            Manager_ID = shahmatcaModel.Manager_ID,
                            NumberRow = numberRow
                        });
                        numberRow ++;
                    }
                }
               
            }
            return rowManagerContrAgGrs;
        }

        private List<ColummnNoklName> GetColummn(List<ShahmatcaModel> shahmatcaModels)
        {
            int numberColummn = 1;
            List<ColummnNoklName> colummnNoklNames = new List<ColummnNoklName>();
            foreach(ShahmatcaModel shahmatcaModel in shahmatcaModels)
            {
                ColummnNoklName colummnNoklName = colummnNoklNames.FirstOrDefault(c => c.NameNomkl == shahmatcaModel.Nomenclature);
                if(colummnNoklName == null)
                {
                    colummnNoklNames.Add(new ColummnNoklName()
                    {
                        NameNomkl = shahmatcaModel.Nomenclature,
                        NumberColummn = numberColummn
                    });
                    numberColummn++;
                }
            }
            return colummnNoklNames;
        }
    }
}
