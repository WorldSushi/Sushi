using Base;
using System;

namespace Data.Entities.Clients
{
    public class ResultFriday : Entity
    {
        public int ClientIdd { get; set; }
        public string ResumeFriday { get; set; }
        public string DataFriday { get; set; }
    }
}