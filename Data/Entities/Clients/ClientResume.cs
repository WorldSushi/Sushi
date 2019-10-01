using Base;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Data.Entities.Clients
{
    public class ClientResume : Entity
    {
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public string FocusProducts { get; set; }
    }
}