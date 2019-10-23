using Base.Attributes;
using System.ComponentModel;

namespace Data.Enums
{
    public enum ClientTypes
    {
        [Description("Не указан")]
        [UIEnumValue("Не указан")]
        WithoutType = 0,

        [Description("Небольшой")]
        [UIEnumValue("Небольшой")]
        Small = 10,

        [Description("Средний 1")]
        [UIEnumValue("Средний 1")]
        Middle1 = 20,

        [Description("Средний 2")]
        [UIEnumValue("Средний 2")]
        Middle2 = 30,

        [Description("Крупный 1")]
        [UIEnumValue("Крупный 1")]
        Large1 = 40,

        [Description("Крупный 2")]
        [UIEnumValue("Крупный 2")]
        Large2 = 50,

        [Description("Крупный 3")]
        [UIEnumValue("Крупный 3")]
        Large3 = 60,

        [Description("Очень крупный")]
        [UIEnumValue("Очень крупный")]
        VeryLarge = 90,
    }
}