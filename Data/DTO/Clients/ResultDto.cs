namespace Data.DTO.Clients
{
    public class ResultDto
    {
        public int ClientId { get; set; }
        public int RegionalCalls { get; set; }
        public int RegionalMails { get; set; }
        public int RegionalWhatsUpMessages { get; set; }
        public int EscortCalls { get; set; }
        public int EscortMails { get; set; }
        public int EscortWhatsUpMessages { get; set; }
    }
}