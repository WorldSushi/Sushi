﻿using Data.Entities.Clients;
using System.Linq;
using Data.Commands.Clients;
using Data.Entities.Users;
using Data.Enums;

namespace Data.Services.Abstract
{
    public interface IClientService
    {
        IQueryable<Client> GetAll();
        IQueryable<Manager> GetManagers(int clientId);

        Client Create(ClientCreateCommand command);
        Client Edit(ClientEditCommand command);
        void Delete(int id);

        Client GetClientByPhone(string phone);
        void BindManager(BindManagerCommand command);
    }
}
