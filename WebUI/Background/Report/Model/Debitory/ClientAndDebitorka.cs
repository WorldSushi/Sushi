using System;
using System.Collections.Generic;

namespace WebUI.Background.Report.Model
{
    public class ClientAndDebitorka
    {
        public int ClientId { get; set; }
        public Guid OneCId { get; set; }
        public string Name { get; set; }
        public List<Data> Datas { get; set; }
        public double Sume { get; set; }
    }
}