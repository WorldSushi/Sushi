using Base;
using Data.Enums;
using System;

namespace Data.Entities.Calls
{
    public class CallsComment : Entity
    {
        public int ClientId { get; set; }
        public int ContactClientId { get; set; }
        public string Comment { get; set; }
        public string ManagerComment { get; set; }
        public string ColorPen { get; set; }
        public int WeekNumber { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; }
        public AcceptControlerCalss AcceptControlerCalss { get; set; }
    }
}