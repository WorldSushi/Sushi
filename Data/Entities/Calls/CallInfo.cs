using Base;

namespace Data.Entities.Calls
{
    public class CallInfo : Entity
    {
        public int CallLogId { get; set; }
        public CallLog CallLog { get; set; }

        public int CallId { get; set; }
        public Call Call { get; set; }
    }
}