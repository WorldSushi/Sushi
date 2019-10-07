using Data.DTO.Calls;
using Data.Enums;
using System.Collections.Generic;

namespace Data.DTO.Clients
{
    public class ClientDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public string ContactName { get; set; }
        public ICollection<ClientPhoneDTO> Phones { get; set; }
        public ClientTypes ClientType { get; set; }
        public int Group { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }
        public NomenclatureAnalysis NomenclatureAnalysis { get; set; }
        public bool HasWorkgroup { get; set; }
        public bool IsCoverage { get; set; }
        public List<CallsCommentDto> CallsComments { get; set; }
    }
}