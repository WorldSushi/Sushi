using Base;

namespace Data.Entities.Clients
{
    public class ContactName : Entity
    {

        public int ClientId { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string ContactRole { get; set; }
        public string Type { get; set; }
    }
}