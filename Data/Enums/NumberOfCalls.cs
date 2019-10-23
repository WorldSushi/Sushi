using Base.Attributes;
using System.ComponentModel;

namespace Data.Enums
{
    public enum NumberOfCalls
    {
        [Description("Не указан")]
        [UIEnumValue("Не указан")]
        WithoutType = 0,

        [Description("1 раз в месяц")]
        [UIEnumValue("1 раз в месяц")]
        OnePerMonth = 10,

        [Description("1 раз в 2 недели")]
        [UIEnumValue("1 раз в 2 недели")]
        OnePerTwoWeek = 20,

        [Description("3 раза в месяц")]
        [UIEnumValue("3 раза в месяц")]
        ThreePerMonth = 30,

        [Description("1 раз в неделю")]
        [UIEnumValue("1 раз в неделю")]
        OnePerWeek = 40,

        [Description("5 раз в месяц")]
        [UIEnumValue("5 раз в месяц")]
        FivePerMonth = 50,

        [Description("6 раз в месяц")]
        [UIEnumValue("6 раз в месяц")]
        SixPerMonth = 60,

        [Description("2 раз в неделю")]
        [UIEnumValue("2 раза в неделю")]
        TwoPerWeek = 90,
    }
}