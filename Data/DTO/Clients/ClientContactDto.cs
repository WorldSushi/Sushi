using System;
using Data.Enums;

namespace Data.DTO.Clients
{
    public class ClientContactDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int Durations { get; set; }
        public ManagerType ManagerType { get; set; }
        public ClientContactType ContactType { get; set; }
        public string Date { get; set; }
        public int ManagerId { get; set; }
        public bool IsAccept { get; set; }
    }
}