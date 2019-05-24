﻿using Data.Enums;

namespace Data.Commands.Clients
{
    public class ClientEditCommand
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Phone { get; set; }
        public string LegalEntity { get; set; }
        public ClientTypes ClientType { get; set; }
        public NumberOfCalls NumberOfCalls { get; set; }
        public BusinessTripCompletedType BusinessTripCompletedType { get; set; }
        public NumberOfShipments NumberOfShipments { get; set; }
    }
}