using Data.Entities.Clients;
using System.Linq;
using Data.Commands.Clients;

namespace Data.Services.Abstract
{
    public interface IClientService
    {
        IQueryable<Client> GetAll();
        //IQueryable<Manager> GetManagers(int clientId);

        Client Create(ClientCreate command);
        //Client Edit(ClientEdit command);
        void Delete(int id);

        Client GetClientByPhone(string phone);
        void BindManager(BindManager command);
    }
}
