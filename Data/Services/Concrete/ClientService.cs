using Base;
using Base.Extensions;
using Data.Entities.Clients;
using Data.Services.Abstract;
using System.Linq;
using Data.Commands.Clients;
using Data.Entities.Users;

namespace Data.Services.Concrete
{
    public class ClientService : IClientService
    {
        private readonly IRepository<Client> _clientRepository;
        private readonly IRepository<ManagerForClient> _managerForClientRepository;

        public ClientService(IRepository<Client> clientRepository,
            IRepository<ManagerForClient> managerForClientRepository)
        {
            _clientRepository = clientRepository;
            _managerForClientRepository = managerForClientRepository;
        }

        public IQueryable<Client> GetAll()
        {
            return _clientRepository.All();
        }

        public IQueryable<Manager> GetManagers(int clientId)
        {
            return _managerForClientRepository.All()
                .Where(x => x.ClientId == clientId)
                .Select(x => x.Manager);
        }

        public Client Create(string title, string phone)
        {
            return _clientRepository.Create(new Client
            {
                Title = title,
                Phone = phone.PhoneFormat()
            });
        }

        public Client GetClientByPhone(string phone)
        {
            return GetAll().Where(x => x.Phone.PhoneFormat() == phone.PhoneFormat())
                .FirstOrDefault();
        }

        public void BindManager(BindManagerCommand command)
        {
            var client = _clientRepository.Get(command.ClientId);

            client.BindManager(command.ManagerId);

            _clientRepository.Update(client);
        }
    }
}
