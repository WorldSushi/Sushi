using Base;
using Data.Entities.Clients;
using Data.Services.Abstract;
using System.Linq;

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
                Phone = phone
            });
        }
    }
}
