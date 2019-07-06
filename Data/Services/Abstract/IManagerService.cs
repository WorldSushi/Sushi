using Data.Entities.Users;
using System.Linq;
using Data.Commands.Manager;

namespace Data.Services.Abstract
{
    public interface IManagerService
    {
        IQueryable<Manager> GetAll();
        //IQueryable<Client> GetClients(int managerId);
        Manager Get(int managerId);
        Manager Update(ManagerEditCommand command);
        int Delete(int id);

        Manager Create(string login, string password, string phone);
    }
}
