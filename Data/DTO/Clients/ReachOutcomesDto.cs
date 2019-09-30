using System.Collections.Generic;

namespace Data.DTO.Clients
{
    public class ReachOutcomesDto
    {
        public string ClientId { get; set; }
        public string NameClient { get; set; }
        public List<ClientPhoneDTO> Phones { get; set; }
        public string Resume1 { get; set; }
        public string Resume2 { get; set; }
    }
}