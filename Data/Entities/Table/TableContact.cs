using Base;
using Data.Enums;
using System;
using System.Collections.Generic;

namespace Data.Entities.Table
{
    public class TableContact : Entity
    {
        public string NameTable { get; set; }
        public DateTime Date { get; set; }
        public TypeDirectory TypeDirectory { get; set; }
        public List<CellContact> CellContacts { get; set; } 
    }
}