using Base;
using Base.Extensions;
using Data.Entities.Users;
using Data.Services.Abstract;
using System.Linq;
using Data.Commands.Manager;

namespace Data.Services.Concrete
{
    public class ManagerService : IManagerService
    {
        private readonly IRepository<Manager> _managers;

        public ManagerService(IRepository<Manager> managers)
        {
            _managers = managers;
        }

        public IQueryable<Manager> GetAll()
        {
            return _managers.All();
        }

        /*public IQueryable<Client> GetClients(int managerId)
        {
            return _managersForClient.All()
                .Where(x => x.ManagerId == managerId)
                .Select(x => x.Client);
        }*/

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

        public Manager Update(ManagerEditCommand command)
        {
            var editingManager = _managers.Get(command.Id);

            editingManager.Login = command.Login;
            editingManager.Password = command.Password;
            editingManager.Phone = command.Phone;

            return _managers.Update(editingManager);
        }

        public int Delete(int id)
        {
            _managers.Delete(id);

            return id;
        }
    }
}
