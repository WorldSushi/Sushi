using Base;
using Base.Extensions;
using Data.Entities.Clients;
using Data.Services.Abstract;
using System.Linq;
using Data.Commands.Clients;

namespace Data.Services.Concrete
{
    public class ClientService : IClientService
    {
        private readonly IRepository<Client> _clientRepository;

        public ClientService(IRepository<Client> clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public IQueryable<Client> GetAll()
        {
            return _clientRepository.All();
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
