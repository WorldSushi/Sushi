using Data.Commands.Manager;
using Data.Enums;

namespace Data.Entities.Users
{
    public class Manager : User
    {
        public string Phone { get; set; }
        public TypeManager? typeManager { get; set; }

        public Manager()
        {

        }

        public Manager(ManagerCreateCommand command)
        {
            Login = command.Login;
            Password = command.Password;
            Phone = command.Phone;
            typeManager = command.typeManager;
        }

        public void Edit(ManagerEditCommand command)
        {
            Login = command.Login;
            Password = command.Password;
            Phone = command.Phone;
            typeManager = command.TypeManager;
        }
    }
}