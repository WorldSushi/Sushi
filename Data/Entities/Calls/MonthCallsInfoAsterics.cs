using Base;
using System;

namespace Data.Entities.Calls
{
    public class MonthCallsInfoAsterics : Entity
    {
        public int LastId { get; protected set; }

        public DateTime Date { get; protected set; }

        public DateTime LastRequestDate { get; protected set; }

        public bool Loading { get; set; }

        protected MonthCallsInfoAsterics()
        {

        }

        public MonthCallsInfoAsterics(int lastId)
        {
            LastId = lastId;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
        }

        public void ChangeOffset(int lastId)
        {
            LastId = lastId;
            LastRequestDate = DateTime.Now;
        }
    }
}