using Data.Enums;

namespace Data.Commands.Clients
{
    public class BindManagerCommand
    {
        public int ClientId { get; set; }
        public int ManagerId { get; set; }
        public ManagerType Type { get; set; }
    }
}