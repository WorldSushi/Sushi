using System;

namespace Base.Extensions
{
    public static class StringExtensions
    {
        public static decimal ToDecimal(this string str)
        {
            var formattedNumber = str.Replace('.', ',');

            var result = Convert.ToDecimal(formattedNumber);

            return result;
        }
    }
}