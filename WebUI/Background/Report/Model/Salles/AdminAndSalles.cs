using System;
using System.Collections.Generic;

namespace WebUI.Background.Report.Model.Salles
{
    public class AdminAndSalles
    {
        public int MangerId { get; set; }
        public Guid OneCIdM { get; set; }
        public string Name { get; set; }
        public double[] SumeMonthe { get; set; }
        public List<GoupAndSalle> GoupAndSalles { get; set; }
        public double Sume { get; set; }
    }
}