using Data.Enums;

namespace Data.Commands.ClientContacts.ClientContact
{
    public class ClientContactCreate
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int ManagerId { get; set; }
        public ManagerType ManagerType { get; set; }
        public ClientContactType ContactType { get; set; }
        public bool IsAccept { get; protected set; }
    }
}