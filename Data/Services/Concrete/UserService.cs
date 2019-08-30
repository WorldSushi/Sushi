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

        public void CreateAdmin()
        {
            //throw new System.NotImplementedException();
        }

        public IQueryable<User> GetAll()
        {
            return _userRepository.All();
        }
    }
}
