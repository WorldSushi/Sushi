using Data.Enums;

namespace Data.DTO.Clients
{
     public class AcceptCallsDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int Durations { get; set; }
        public ManagerType ManagerType { get; set; }
        public ClientContactType ContactType { get; set; }
        public string Date { get; set; }
        public string TitleClient { get; set; }
        public string ReferenceAudioVoice { get; set; }
        public string Phone { get; set; }
        public string Direction { get; set; }
        public int ManagerId { get; set; }
        
    }
}
