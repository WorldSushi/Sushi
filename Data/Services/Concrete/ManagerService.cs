using Base;
using Base.Extensions;
using Data.Entities.Users;
using Data.Services.Abstract;
using System.Linq;
using Data.Entities.Clients;

namespace Data.Services.Concrete
{
    public class ManagerService : IManagerService
    {
        private readonly IRepository<Manager> _managers;
        private readonly IRepository<ManagerForClient> _managersForClient;

        public ManagerService(IRepository<Manager> managers,
            IRepository<ManagerForClient> managersForClient)
        {
            _managers = managers;
            _managersForClient = managersForClient;
        }

        public IQueryable<Manager> GetAll()
        {
            return _managers.All();
        }

        public IQueryable<Client> GetClients(int managerId)
        {
            return _managersForClient.All()
                .Where(x => x.ManagerId == managerId)
                .Select(x => x.Client);
        }

        public Manager Get(int managerId)
        {
            return _managers.Get(managerId);
        }

        public Manager Create(string login, string password, string phone)
        {
            return _managers.Create(new Manager
            {
                Login = login,
                Password = password,
                Phone = phone.PhoneFormat()
            });
        }
    }
}
