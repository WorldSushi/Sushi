using System;
using System.Collections.Generic;
using System.Text;

namespace Data.DTO.Clients
{
    public class ClientPhoneDTO
    {
        public int Id { get; set; }
        public string Phone { get; set; }

        public int ClientId { get; set; }

        public bool Deleted { get; set; }
    }
}
