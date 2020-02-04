using System;

namespace Data.DTO.Clients
{
    public class ClientResumeWeekDto
    {
        public string ClientId { get; set; }
        public string ClientIdCRM { get; set; }
        public string Resume { get; set; }
        public DateTime Date { get; set; }
    }
}