using Base;
using Data.Entities.Users;
using Data.Services.Abstract;
using System.Linq;

namespace Data.Services.Concrete
{
    public class ManagerService : IManagerService
    {
        private readonly IRepository<Manager> _managerRepository;

        public ManagerService(IRepository<Manager> managerRepository)
        {
            _managerRepository = managerRepository;
        }

        public IQueryable<Manager> GetAll()
        {
            return _managerRepository.All();
        }
    }
}
