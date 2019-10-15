using System;

namespace Data.Entities.Calls
{
    public class CallManager : Call
    {
        public int ManagerId { get; set; }

        public int ManagerIdC { get; set; }

        public DateTime DateTime { get; set; }

        public int Duration { get; set; }

        public string Recording { get; set; }
        public string Direction { get; set; }
    }
}