using Data.Enums;

namespace Data.Commands.Manager
{
    public class ManagerCreateCommand
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public TypeManager typeManager { get; set; }

    }
}