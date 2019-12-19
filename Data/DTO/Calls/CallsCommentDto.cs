using Data.Enums;

namespace Data.DTO.Calls
{
    public class CallsCommentDto
    {
        public int ClientId { get; set; }
        public int ContactClientId { get; set; }
        public int Durations { get; set; }
        public string Comment { get; set; }
        public string Date { get; set; }
        public string ManagerComment { get; set; }
        public string ColorPen { get; set; }
        public string Type { get; set; }
        public AcceptControlerCalss AcceptControlerCalss { get; set; }
        public int? WeekNumber { get; set; }
    }
}