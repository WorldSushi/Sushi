using Data.Entities.Users;
using System.Linq;

namespace Data.Services.Abstract
{
    public interface IManagerService
    {
        IQueryable<Manager> GetAll();

        Manager Create(string login, string password, string phone);
    }
}
