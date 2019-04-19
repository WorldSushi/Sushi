using Data.Entities.Clients;
using System.Linq;
using Data.Commands.Clients;

namespace Data.Services.Abstract
{
    public interface IClientService
    {
        IQueryable<Client> GetAll();

        Client Create(string title, string phone);
        Client GetClientByPhone(string phone);
        void BindManager(BindManagerCommand command);
    }
}
