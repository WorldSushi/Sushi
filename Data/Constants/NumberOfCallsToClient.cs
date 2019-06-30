using System;
using Data.Enums;

namespace Data.Constants
{
    public static class NumberOfCallsToClient
    {
        public static int CallsPerMonth(NumberOfCalls numberOfCalls)
        {
            switch (numberOfCalls)
            {
                case NumberOfCalls.OnePerMonth:
                    return 1;
                case NumberOfCalls.OnePerTwoWeek:
                    return 2;
                case NumberOfCalls.ThreePerMonth:
                    return 3;
                case NumberOfCalls.OnePerWeek:
                    return 4;
                case NumberOfCalls.FivePerMonth:
                    return 5;
                case NumberOfCalls.SixPerMonth:
                    return 6;
                case NumberOfCalls.TwoPerWeek:
                    return 8;
                default:
                    throw new Exception("Не указано кол-во звонков в месяц.");
            }
        }
    }
}