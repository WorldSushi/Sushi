using System;

namespace Base.Helpers
{
    public static class DateHelper
    {
        public static bool MonthAndYearEqual(DateTime date1, DateTime date2)
        {
            return date1.Month == date2.Month && date1.Year == date2.Year;
        }

        public static bool IsCurrentMonth(DateTime date)
        {
            return MonthAndYearEqual(date, DateTime.Now);
        }
    }
}