using System.Text.RegularExpressions;

namespace Base.Helpers
{
    public static class PhoneHelper
    {
        public static string ConvertToPhone(string phone)
        {
            if(phone == "9057330379")
            {

            }
            if (phone == "8-977-424-81-53")
            {

            }
            if (phone != null)
            {
                string newPhone = Regex.Replace(phone, @"[^0-9$,]", "");

                if (newPhone.Length == 10)
                    return newPhone;
                if (newPhone.Length == 11)
                    return newPhone.Substring(1);
            }

            return "";
        }
    }
}