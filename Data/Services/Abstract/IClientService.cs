using Data.Entities.Clients;
using System.Linq;

namespace Data.Services.Abstract
{
    public interface IClientService
    {
        IQueryable<Client> GetAll();
        Client Create(string title, string phone);
    }
}
