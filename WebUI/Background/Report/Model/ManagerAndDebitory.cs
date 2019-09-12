using System;
using System.Collections.Generic;

namespace WebUI.Background.Report.Model
{
    public class ManagerAndDebitory
    {
        public int MangerId { get; set; }
        public Guid OneCIdM { get; set; }
        public string Name { get; set; }
        public List<ClientAndDebitorka> clientAndDebitorkas { get; set; }
        public double Sume { get; set; }
    }
}