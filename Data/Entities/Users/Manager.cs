using System.Collections.Generic;
using Data.Entities.Clients;

namespace Data.Entities.Users
{
    public class Manager : User
    {
        public string Phone { get; set; }

        public ICollection<ManagerForClient> Clients { get; set; } = new HashSet<ManagerForClient>();
    }
}