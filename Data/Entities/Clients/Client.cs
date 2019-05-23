using System.Collections.Generic;
using Base;
using Data.Enums;

namespace Data.Entities.Clients
{
    public class Client : Entity
    {
        public string Title { get; set; }

        public string Phone { get; set; }

        public string LegalEntity { get; set; }

        public ClientTypes ClientType { get; set; }

        public NumberOfCalls NumberOfCalls { get; set; }

        public ShipmentPeriodicity ShipmentPeriodicity { get; set; }

        public NumberOfShipments NumberOfShipments { get; set; }

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