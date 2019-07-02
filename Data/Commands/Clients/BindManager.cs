using Data.Enums;

namespace Data.Commands.Clients
{
    public class BindManager
    {
        public int ClientId { get; set; }
        public int ManagerId { get; set; }
        public ManagerType Type { get; set; }
    }
}