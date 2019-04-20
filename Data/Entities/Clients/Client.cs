using System.Collections.Generic;
using Base;

namespace Data.Entities.Clients
{
    public class Client : Entity
    {
        public string Title { get; set; }

        public string Phone { get; set; }

        public ICollection<ManagerForClient> Managers { get; set; } = new HashSet<ManagerForClient>();

        public void BindManager(int managerId)
        {

            Managers.Add(
                new ManagerForClient(
                    Id,
                    managerId));
        }
    }
}