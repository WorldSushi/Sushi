using System.Collections.Generic;

namespace WebUI.Background.Report.Model.Salles
{
    public class GoupAndSalle
    {
        public string Name { get; set; }
        public double[] SumeMonthe { get; set; }
        public double Sume { get; set; }
        public List<int> ClientIdS { get; set; }
    }
}