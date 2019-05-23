using Base.Attributes;

namespace Data.Enums
{
    public enum NumberOfShipments
    {
        [UIEnumValue("Не указан")]
        WithoutType = 0,

        [UIEnumValue("1 раз в месяц")]
        OnePerMonth = 10,

        [UIEnumValue("1 раз в 2 недели")]
        OnePerTwoWeek = 20,

        [UIEnumValue("3 раза в месяц")]
        ThreePerMonth = 30,

        [UIEnumValue("1 раз в неделю")]
        OnePerWeek = 40,

        [UIEnumValue("5 раз в месяц")]
        FivePerMonth = 50,

        [UIEnumValue("6 раз в месяц")]
        SixPerMonth = 60,

        [UIEnumValue("2 раза в неделю")]
        TwoPerWeek = 90,
    }
}