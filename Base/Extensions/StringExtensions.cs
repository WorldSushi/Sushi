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

        public static string PhoneFormat(this string str)
        {
            var phone = str.Replace(" ", "");
            phone = str.Replace("(", "");
            phone = str.Replace(")", "");
            phone = str.Replace("-", "");
            var firstCode = phone.Substring(0, 2);
            if (firstCode == "+7")
            {
                phone = phone.Remove(0, 2);
                phone = phone.Insert(0, "8");
            }
                
            return phone;
        }
    }
}