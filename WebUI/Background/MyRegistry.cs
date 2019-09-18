﻿using Data;
using FluentScheduler;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using WebUI.Background.Report;

namespace WebUI.Background
{
    public class MyRegistry : Registry
    {
        public MyRegistry(ApplicationContext applicationContext)
        {
            Task.Run(() => CreateEmtypdf());
            Schedule(() => new DebitoryReport(applicationContext)).ToRunEvery(1).Days().At(9, 22);
            Schedule(() => new SalleReport(applicationContext)).ToRunEvery(1).Days().At(9, 24);
            Schedule(() => new Nomenclature(applicationContext)).ToRunEvery(1).Days().At(9, 26);
            Schedule(() => new OprosReport(applicationContext)).ToRunEvery(1).Days().At(9, 28);
            //Schedule(() => new OprosReport(applicationContext)).ToRunNow().AndEvery(2).Hours();
        }

        private void CreateEmtypdf()
        {
            if (!Directory.Exists("PDF"))
            {
                Directory.CreateDirectory("PDF");
            }
            Document doc = new Document();
            PdfWriter.GetInstance(doc, new FileStream("PDF/Emty.pdf", FileMode.Create));
            doc.Open();
            doc.SetMargins(0, 0, 3, 3);
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Encoding.GetEncoding("windows-1254");
            BaseFont baseFont = BaseFont.CreateFont(@"C:\Windows\Fonts\arial.ttf", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            iTextSharp.text.Font font = new iTextSharp.text.Font(baseFont, 12, iTextSharp.text.Font.NORMAL);
            PdfPTable table = new PdfPTable(20);
            table.TotalWidth = 590f;
            table.LockedWidth = true;
            PdfPCell cell = new PdfPCell(new Phrase($"Такого отчёта нету", font));
            cell.Colspan = 20;
            cell.HorizontalAlignment = 1;
            cell.Border = 0;
            table.AddCell(cell);
            doc.Add(table);
            doc.Close();
        }
    }
}