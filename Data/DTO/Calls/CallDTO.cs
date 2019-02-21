using System.Collections.Generic;

namespace Data.DTO.Calls
{
    public class CallsDTO
    {
        public string Results_next_offset { get; set; }
        public string Results_count { get; set; }

        public List<CallDTO> Results { get; set; }
       
    }

    public class CallDTO
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
