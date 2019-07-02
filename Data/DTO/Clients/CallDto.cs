using System;
using Data.Enums;

namespace Data.DTO.Clients
{
    public class CallDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ManagerType ManagerType { get; set; }
        public DateTime Date { get; set; }
    }
}