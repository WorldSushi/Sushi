using Base;
using Data.Entities.Users;
using Data.Services.Abstract;
using System.Linq;

namespace Data.Services.Concrete
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public void CreateAdmin(string login, string password)
        {
            Admin admin = new Admin();
            admin.Login = login;
            admin.Password = password;
            _userRepository.Create(admin);
        }

        public IQueryable<User> GetAll()
        {
            return _userRepository.All();
        }
    }
}
