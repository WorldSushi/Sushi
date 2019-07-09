using System;
using Base;

namespace Data.Entities.Calls
{
    public class MonthCallsInfo : Entity
    {
        public int Offset { get; protected set; }

        public DateTime Date { get; protected set; }

        public DateTime LastRequestDate { get; protected set; }

        protected MonthCallsInfo()
        {

        }

        public MonthCallsInfo(int offset)
        {
            Offset = offset;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
        }

        public void ChangeOffset(int offset)
        {
            Offset = offset;
            LastRequestDate = DateTime.Now;
        }
    }
}