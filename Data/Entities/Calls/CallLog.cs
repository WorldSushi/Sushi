using Base;

namespace Data.Entities.Calls
{
    public class CallLog : Entity
    {
        public string Direction { get; set; }
        public string User_account { get; set; }
        public string Client_number { get; set; }
        public int Start_time { get; set; }
        public string Src_number { get; set; }
        public int Duration { get; set; }
        public string User_id { get; set; }
        public string Answer_time { get; set; }
        public string Src_id { get; set; }
        public string Client_name { get; set; }
        public string Src_slot { get; set; }
        public string Recording { get; set; }
        public string Answered { get; set; }
        public string Db_call_id { get; set; }
        public int End_time { get; set; }
    }
}