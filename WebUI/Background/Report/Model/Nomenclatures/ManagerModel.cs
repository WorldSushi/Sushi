using System;
using System.Collections.Generic;

namespace WebUI.Background.Report.Model.Nomenclatures
{
    public class ManagerModel
    {
        public int MangerId { get; set; }
        public Guid OneCIdM { get; set; }
        public string Name { get; set; }
        public List<GRContragent> GRContragents { get; set; }
        public double SumeKolNom { get; set; }
    }
}