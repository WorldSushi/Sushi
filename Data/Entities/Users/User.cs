using Base;

namespace Data.Entities.Users
{
    public abstract class User : Entity
    {
        public string Login { get; protected set; }

        public string Password { get; protected set; }
    }
}