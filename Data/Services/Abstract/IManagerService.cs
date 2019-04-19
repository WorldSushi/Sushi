using Data.Entities.Users;
using System.Linq;
using Data.Entities.Clients;

namespace Data.Services.Abstract
{
    public interface IManagerService
    {
        IQueryable<Manager> GetAll();
        IQueryable<Client> GetClients(int managerId);
        Manager Get(int managerId);

        Manager Create(string login, string password, string phone);
    }
}
