﻿using System.Collections.Generic;

namespace Data.DTO.Clients
{
    public class WorkGroupDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int EscortManagerId { get; set; }
        public int RegionalManagerId { get; set; }
        public string EscortManagerName { get; set; }
        public string RegionalManagerName { get; set; }
        public int EscortManagerEfficiency { get; set; }
        public int RegionalManagerEfficiency { get; set; }

        public ICollection<int> ClientIds { get; set; }
    }
}