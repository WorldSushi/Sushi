using Data.Entities.Clients;
using System.Collections.Generic;

namespace Data.DTO.Clients
{
    public class ReachOutcomesDto
    {
        public string ClientId { get; set; }
        public string NameClient { get; set; }
        public string ContactName { get; set; }
        public string Position { get; set; }
        public string FocusProducts { get; set; }
        public List<ResultFriday> ResultFridays { get; set; }
        public List<ClientPhoneDTO> Phones { get; set; }
        public WeekPlanDto WeekPlanDtoReg { get; set; }
        public WeekPlanDto WeekPlanDtoEsc { get; set; }
    }
}