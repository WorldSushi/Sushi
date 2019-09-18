using Data.Commands.Manager;

namespace Data.Entities.Users
{
    public class Marketolog : User
    {
        public Marketolog()
        {

        }

        public Marketolog(ManagerCreateCommand command)
        {
            Login = command.Login;
            Password = command.Password;
        }

        public void Edit(ManagerEditCommand command)
        {
            Login = command.Login;
            Password = command.Password;
        }
    }
}
