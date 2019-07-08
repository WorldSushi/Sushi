using Base;

namespace Data.Entities.Calls
{
    public class CallLog : Entity
    {
        public string Direction { get; set; }
        public string UserAccount { get; set; }
        public string ClientNumber { get; set; }
        public int StartTime { get; set; }
        public string SrcNumber { get; set; }
        public int Duration { get; set; }
        public string UserId { get; set; }
        public string Answer_time { get; set; }
        public string SrcId { get; set; }
        public string ClientName { get; set; }
        public string SrcSlot { get; set; }
        public string Recording { get; set; }
        public string Answered { get; set; }
        public string DbCallId { get; set; }
        public int EndTime { get; set; }
    }
}