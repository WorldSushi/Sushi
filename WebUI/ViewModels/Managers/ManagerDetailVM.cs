using Data.DTO.Calls;
using System.Collections.Generic;

namespace WebUI.ViewModels.Managers
{
    public class ManagerDetailVM
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
    }

    public class CallVM
    {
        public string Date { get; set; }
        public string ClientTitle { get; set; }
        public string Src_Number { get; set; }
        public string Duration { get; set; }
        public string Recording { get; set; }
    }
}
