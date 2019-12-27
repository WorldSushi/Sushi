using Base;
using System;

namespace Data.Entities.Table
{
    public class CellContact : Entity
    {
        public int ClientId { get; set; }
        public int TableId { get; set; }
        public DateTime DateTime { get; set; }
        public string Data { get; set; }
    }
}