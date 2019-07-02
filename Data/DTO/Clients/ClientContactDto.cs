using System;
using Data.Enums;

namespace Data.DTO.Clients
{
    public class ClientContactDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ManagerType ManagerType { get; set; }
        public ClientContactType ContactType { get; set; }
        public DateTime Date { get; set; }
    }
}