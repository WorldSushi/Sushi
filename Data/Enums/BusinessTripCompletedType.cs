using Base.Attributes;

namespace Data.Enums
{
    public enum BusinessTripCompletedType
    {
        [UIEnumValue("Не выполнено")]
        DidntCompleted = 0,

        [UIEnumValue("Выполнено на треть")]
        Third = 10,

        [UIEnumValue("Выполнено на половину")]
        Half = 20,

        [UIEnumValue("Выполнено")]
        Complete = 30
    }
}
