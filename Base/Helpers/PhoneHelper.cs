using System.Text.RegularExpressions;

namespace Base.Helpers
{
    public static class PhoneHelper
    {
        public static string ConvertToPhone(string phone)
        {
            string newPhone = Regex.Replace(phone, @"[^0-9$,]", "");

            if (newPhone.Length == 10)
                return newPhone;
            if (newPhone.Length == 11)
                return newPhone.Substring(1);

            return "";
        }
    }
}