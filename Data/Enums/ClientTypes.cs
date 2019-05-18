using Base.Attributes;

namespace Data.Enums
{
    public enum ClientTypes
    {
        [UIEnumValue("Не указан")]
        WithoutType = 0,

        [UIEnumValue("Небольшой")]
        Small = 10,

        [UIEnumValue("Средний 1")]
        Middle1 = 20,

        [UIEnumValue("Средний 2")]
        Middle2 = 30,

        [UIEnumValue("Крупный 1")]
        Large1 = 40,

        [UIEnumValue("Крупный 2")]
        Large2 = 50,

        [UIEnumValue("Крупный 3")]
        Large3 = 60,

        [UIEnumValue("Очень крупный")]
        VeryLarge = 90,
    }
}