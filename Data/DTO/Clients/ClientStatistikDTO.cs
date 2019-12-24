using Data.DTO.Users;
using Data.Enums;

namespace Data.DTO.Clients
{
    public class ManagerStatistikDTO
    {
        public int? WorkgroupId { get; set; }
        public string WorkgroupTitle { get; set; }
        public int? EscortManagerId { get; set; }
        public string EscortManagerName { get; set; }
        public int? RegionalManagerId { get; set; }
        public string RegionalManagerName { get; set; }
        public CallStatisticDTO CallStatistRMDTO { get; set; }
        public CallStatisticDTO CallStatistiMCDTO { get; set; }

    }
}