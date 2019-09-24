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
            CreateCountXsml(colummnNoklNames, rowManagerContrAgGrs, shahmatcaModels);
        }

        private void CreateCountXsml(List<ColummnNoklName> colummnNoklNames, List<RowManagerContrAgGr> rowManagerContrAgGrs, List<ShahmatcaModel> shahmatcaModels)
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
            CreatXMLSCount(spreadsheetDocument, ref i, colummnNoklNames, rowManagerContrAgGrs, shahmatcaModels, worksheetPart);
            CreatXMLSSumme(spreadsheetDocument, ref i, colummnNoklNames, rowManagerContrAgGrs, shahmatcaModels, worksheetPart);
            worksheetPart.Worksheet.Save();
            spreadsheetDocument.Close();
        }

        private void CreatXMLSSumme(SpreadsheetDocument spreadsheetDocument, ref int i, List<ColummnNoklName> colummnNoklNames, List<RowManagerContrAgGr> rowManagerContrAgGrs, List<ShahmatcaModel> shahmatcaModels, WorksheetPart worksheetPart)
        {
            SharedStringTablePart shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
            string nameColummn = GetCharOfTabel(0);
            InsertSharedStringItem("Группа контрагентов", shareStringPart);
            Cell cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGrs.Count + 3), worksheetPart, 1, 80);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
            nameColummn = GetCharOfTabel(1);
            InsertSharedStringItem("Контрагент/Номенклатура", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGrs.Count + 3), worksheetPart, 1, 80);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            foreach (ColummnNoklName colummnNoklName in colummnNoklNames)
            {
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                nameColummn = GetCharOfTabel(colummnNoklName.NumberColummn + 2);
                InsertSharedStringItem(colummnNoklName.NameNomkl, shareStringPart);
                cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGrs.Count + 3), worksheetPart, 2, 80);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;
            }
            foreach (RowManagerContrAgGr rowManagerContrAgGr in rowManagerContrAgGrs)
            {
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                InsertSharedStringItem(rowManagerContrAgGr.GR_Contragent, shareStringPart);
                cell = InsertCellInWorksheet("A", (UInt32)(rowManagerContrAgGrs.Count + rowManagerContrAgGr.NumberRow + 4), worksheetPart, 1, 30);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                InsertSharedStringItem(rowManagerContrAgGr.Contragent, shareStringPart);
                cell = InsertCellInWorksheet("B", (UInt32)(rowManagerContrAgGrs.Count + rowManagerContrAgGr.NumberRow + 4), worksheetPart, 1, 30);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;

                nameColummn = GetCharOfTabel(colummnNoklNames.Count + 2);
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                InsertSharedStringItem(rowManagerContrAgGr.Manager, shareStringPart);
                cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGrs.Count + rowManagerContrAgGr.NumberRow + 4), worksheetPart, 1, 30);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;
            }
            foreach (ShahmatcaModel shahmatcaModel in shahmatcaModels)
            {
                ColummnNoklName colummnNoklName = colummnNoklNames.FirstOrDefault(c => c.NameNomkl == shahmatcaModel.Nomenclature);
                RowManagerContrAgGr rowManagerContrAgGr = rowManagerContrAgGrs.FirstOrDefault(r => r.Contragent == shahmatcaModel.Contragent);
                if (rowManagerContrAgGr != null)
                {
                    shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                    nameColummn = GetCharOfTabel(colummnNoklName.NumberColummn + 2);
                    InsertSharedStringItem(shahmatcaModel.Summa, shareStringPart);
                    if (shahmatcaModel.SummaColor == "R" || shahmatcaModel.SummaColor == "Н")
                    {
                        cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGrs.Count + rowManagerContrAgGr.NumberRow + 4), worksheetPart, 4, 30);
                    }
                    else if (shahmatcaModel.SummaColor == "B")
                    {
                        cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGrs.Count + rowManagerContrAgGr.NumberRow + 4), worksheetPart, 5, 30);
                    }
                    else if (shahmatcaModel.SummaColor == "W")
                    {
                        cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGrs.Count + rowManagerContrAgGr.NumberRow + 4), worksheetPart, 3, 30);
                    }

                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    cell.CellValue = new CellValue(i.ToString());
                    worksheetPart.Worksheet.Save();
                    i++;
                }
            }
        }

        private void CreatXMLSCount(SpreadsheetDocument spreadsheetDocument, ref int i, List<ColummnNoklName> colummnNoklNames, List<RowManagerContrAgGr> rowManagerContrAgGrs, List<ShahmatcaModel> shahmatcaModels, WorksheetPart worksheetPart)
        {
            SharedStringTablePart shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
            string nameColummn = GetCharOfTabel(0);
            InsertSharedStringItem("Группа контрагентов", shareStringPart);
            Cell cell = InsertCellInWorksheet(nameColummn, 2, worksheetPart, 1, 80);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
            nameColummn = GetCharOfTabel(1);
            InsertSharedStringItem("Контрагент/Номенклатура", shareStringPart);
            cell = InsertCellInWorksheet(nameColummn, 2, worksheetPart, 1, 80);
            cell.CellValue = new CellValue(i.ToString());
            cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
            worksheetPart.Worksheet.Save();
            i++;
            foreach (ColummnNoklName colummnNoklName in colummnNoklNames)
            {
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                nameColummn = GetCharOfTabel(colummnNoklName.NumberColummn + 2);
                InsertSharedStringItem(colummnNoklName.NameNomkl, shareStringPart);
                cell = InsertCellInWorksheet(nameColummn, 2, worksheetPart, 2, 80);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;
            }
            foreach (RowManagerContrAgGr rowManagerContrAgGr in rowManagerContrAgGrs)
            {
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                InsertSharedStringItem(rowManagerContrAgGr.GR_Contragent, shareStringPart);
                cell = InsertCellInWorksheet("A", (UInt32)(rowManagerContrAgGr.NumberRow + 3), worksheetPart, 1, 30);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                InsertSharedStringItem(rowManagerContrAgGr.Contragent, shareStringPart);
                cell = InsertCellInWorksheet("B", (UInt32)(rowManagerContrAgGr.NumberRow + 3), worksheetPart, 1, 30);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;

                nameColummn = GetCharOfTabel(colummnNoklNames.Count + 2);
                shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                InsertSharedStringItem(rowManagerContrAgGr.Manager, shareStringPart);
                cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGr.NumberRow + 3), worksheetPart, 1, 30);
                cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                cell.CellValue = new CellValue(i.ToString());
                worksheetPart.Worksheet.Save();
                i++;
            }
            foreach (ShahmatcaModel shahmatcaModel in shahmatcaModels)
            {
                ColummnNoklName colummnNoklName = colummnNoklNames.FirstOrDefault(c => c.NameNomkl == shahmatcaModel.Nomenclature);
                RowManagerContrAgGr rowManagerContrAgGr = rowManagerContrAgGrs.FirstOrDefault(r => r.Contragent == shahmatcaModel.Contragent);
                if (rowManagerContrAgGr != null)
                {
                    shareStringPart = GetSharedStringTablePart(spreadsheetDocument.WorkbookPart);
                    nameColummn = GetCharOfTabel(colummnNoklName.NumberColummn + 2);
                    InsertSharedStringItem(shahmatcaModel.Kol, shareStringPart);
                    if (shahmatcaModel.KolColor == "R" || shahmatcaModel.KolColor == "Н")
                    {
                        cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGr.NumberRow + 3), worksheetPart, 4, 30);
                    }
                    else if (shahmatcaModel.KolColor == "B")
                    {
                        cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGr.NumberRow + 3), worksheetPart, 5, 30);
                    }
                    else if (shahmatcaModel.KolColor == "W")
                    {
                        cell = InsertCellInWorksheet(nameColummn, (UInt32)(rowManagerContrAgGr.NumberRow + 3), worksheetPart, 3, 30);
                    }

                    cell.DataType = new EnumValue<CellValues>(CellValues.SharedString);
                    cell.CellValue = new CellValue(i.ToString());
                    worksheetPart.Worksheet.Save();
                    i++;
                }
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
            while(indexColummmn > 25)
            {
                int ost = indexColummmn - 26;
                numberChars.Add(ost);
                indexColummmn = ost;
            }
            if(numberChars.Count != 0)
            {
                charTabel += GetChar(numberChars.Count - 1);
            }
            else
            {
                charTabel += GetChar(indexColummmn);
            }
            foreach(int numberChar in numberChars)
            {
                charTabel += GetChar(numberChar);
            }
            return charTabel;
        }

        private string GetChar(int number)
        {
            string charT = null;
            switch(number)
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

                Cell newCell = new Cell() { CellReference = cellReference};
                newCell.StyleIndex = stleIndex;
                row.InsertBefore(newCell, refCell);
                worksheet.Save();
                return newCell;
            }
        }

        private Stylesheet GenerateStylesheet()
        {
            Stylesheet styleSheet = null;

            Fills fills = new Fills(
                    new Fill(new PatternFill() { PatternType = PatternValues.None }),
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#DF013A") }) { PatternType = PatternValues.Solid }),
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#2EFE9A") }) { PatternType = PatternValues.Solid }),
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue("#81BEF7") }) { PatternType = PatternValues.Solid })
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
                new Font() { Bold = new Bold() },
                new Font()
                );

            CellFormats cellFormats = new CellFormats(
                new CellFormat
                {
                    FillId = 0,
                    BorderId = 0,
                    ApplyFill = true,
                    FontId = 1
                },
                    new CellFormat
                    {
                        Alignment = new Alignment()
                        {
                            Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Left),
                            Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Bottom),
                            WrapText = true
                        },
                        FillId = 0,
                        BorderId = 0,
                        ApplyFill = true,
                        FontId = 1
                    },
                    new CellFormat
                    {
                        Alignment = new Alignment()
                        {
                            Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Center),
                            Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Bottom),
                            WrapText = true
                        },
                        FillId = 0,
                        BorderId = 0,
                        ApplyFill = true,
                        FontId = 1
                    },
                    new CellFormat
                    {
                        Alignment = new Alignment()
                        {
                            Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Right),
                            Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                            WrapText = true
                        },
                        FillId = 2,
                        BorderId = 0,
                        ApplyFill = true,
                        FontId = 0
                    },
                    new CellFormat
                    {
                        Alignment = new Alignment()
                        {
                            Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Right),
                            Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                            WrapText = true
                        },
                        FillId = 1,
                        BorderId = 0,
                        ApplyFill = true,
                        FontId = 0
                    },
                    new CellFormat
                    {
                        Alignment = new Alignment()
                        {
                            Horizontal = new EnumValue<HorizontalAlignmentValues>(HorizontalAlignmentValues.Right),
                            Vertical = new EnumValue<VerticalAlignmentValues>(VerticalAlignmentValues.Center),
                            WrapText = true
                        },
                        FillId = 3,
                        BorderId = 0,
                        ApplyFill = true,
                        FontId = 0
                    }
                );

            styleSheet = new Stylesheet(font, fills, borders, cellFormats);

            return styleSheet;
        }

        private List<RowManagerContrAgGr> GetRows(List<ShahmatcaModel> shahmatcaModels)
        {
            int numberRow = 0;
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
            int numberColummn = 0;
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
