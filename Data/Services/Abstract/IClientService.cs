using Data.Entities.Clients;
using System.Linq;
using Data.Commands.Clients;
using Data.Entities.Users;

namespace Data.Services.Abstract
{
    public interface IClientService
    {
        IQueryable<Client> GetAll();
        IQueryable<Manager> GetManagers(int clientId);

        Client Create(string title, string phone);
        Client Edit(ClientEditCommand command);

        Client GetClientByPhone(string phone);
        void BindManager(BindManagerCommand command);
    }
}
