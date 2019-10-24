using Base;
using System.Collections.Generic;

namespace Data.Entities.Clients
{
    public class ClientGR : Entity
    {
        public ICollection<Client> Clients { get; set; }
        public string NameGr { get; set; }
    }
}