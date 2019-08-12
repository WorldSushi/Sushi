using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Clients
{
    public class NomenclatureAnalysis
    {
        public int Id { get; set; }
        public int ReportPrevMonth { get; set; }
        public int ReportAvg5Months { get; set; }
        public int PrevMonth { get; set; }
        public int Avg5Months { get; set; }
        public int ClientId { get; set; }
    }
}
