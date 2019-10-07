using Base;
using Data.Enums;

namespace Data.Entities.Calls
{
    public class CallsComment : Entity
    {
        public int ClientId { get; set; }
        public int ContactClientId { get; set; }
        public string Comment { get; set; }
        public AcceptControlerCalss AcceptControlerCalss { get; set; }
    }
}