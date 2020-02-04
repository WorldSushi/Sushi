using System;
using System.Globalization;

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

        public static bool IsCurrentWeek(DateTime date, int weekNum)
        {
            DateTime beginningOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            while (date.Date.AddDays(1).DayOfWeek != CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek)
                date = date.AddDays(1);
            int weekNumber = (int)Math.Truncate((double)DateTime.Now.Subtract(beginningOfMonth).TotalDays / 7f) + 1;
            return weekNum == weekNumber && IsCurrentMonth(date);
        }
    }
}