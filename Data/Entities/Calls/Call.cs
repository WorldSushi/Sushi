using Base;

namespace Data.Entities.Calls
{
    public class Call : Entity
    {
        public string ClientNumber { get; set; }
        public string Src_number { get; set; }
        public int Duration { get; set; }
        public string Recording { get; set; }
    }
}
