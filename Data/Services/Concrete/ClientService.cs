using System;
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

        public Client Create(ClientCreate command)
        {
            return _clientRepository.Create(
                new Client(command));
        }

        /*public Client Edit(ClientEdit command)
        {
            var client = _clientRepository.Get(command.Id);

            client.Title = command.Title;
            client.Phone = command.Phone;
            client.LegalEntity = command.LegalEntity;
            client.ClientType = command.ClientType;
            client.NumberOfCalls = command.NumberOfCalls;
            client.NumberOfShipments = command.NumberOfShipments;

            _clientRepository.Update(client);

            return client;
        }*/

        public void Delete(int id)
        {
            _clientRepository.Delete(id);
        }

        public Client GetClientByPhone(string phone)
        {
            return GetAll().Where(x => x.Phone.PhoneFormat() == phone.PhoneFormat())
                .FirstOrDefault();
        }

        public void BindManager(BindManager command)
        {
            /*var client = _clientRepository.Get(command.ClientId);

            var managersForClient = _managerForClientRepository.All()
                .Where(x => x.ClientId == client.Id)
                .Select(x => x.Id);

            foreach(var managerForClient in managersForClient)
            {
                _managerForClientRepository.Delete(managerForClient);
            }

            foreach (var managerId in command.ManagerIds)
            {
                if (_managerForClientRepository.All().Any(x => x.ClientId == client.Id && x.ManagerId == managerId))
                {

                }
                else
                {
                    client.BindManager(managerId);
                }               
                    
            }

            

            _clientRepository.Update(client);*/

            throw new Exception("Legacy");
        }
    }
}
