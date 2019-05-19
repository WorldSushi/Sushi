using System.Collections.Generic;
using Data.DTO.Calls;
using Data.Enums;

namespace WebUI.ViewModels.Clients
{
    public class ClientForAdminVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string LegalEntity { get; set; }
        public string Phone { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public int? PlannedAmountCalls { get; set; }
        public int AmountCalls { get; set; }
        public ICollection<ClientManagersVM> Managers { get; set; }
    }

    public class ClientManagersVM
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public int AmountCalls { get; set; }
        public int? PlannedAmountCalls { get; set; }
        public ICollection<CallDTO> Calls { get; set; }
    }
}