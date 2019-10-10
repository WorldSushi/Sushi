using Base;

namespace Data.Entities.Users
{
    public abstract class User : Entity
    {
        public string Login { get; set; }

        public string Password { get; set; }
    }
}