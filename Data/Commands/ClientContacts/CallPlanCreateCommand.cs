﻿namespace Data.Commands.ClientContacts
{
    public class CallPlanCreateCommand
    {
        public int ClientId { get; set; }
        public int TotalCalls { get; set; }
        public int EscortManagerId { get; set; }
        public int RegionalManagerId { get; set; }
    }
}