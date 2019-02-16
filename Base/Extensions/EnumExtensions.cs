using System;
using System.Reflection;
using Base.Attributes;

namespace Base.Extensions
{
    public static class EnumExtensions
    {
        public static string GetTitle(this Enum value)
        {
            FieldInfo fieldInfo = value.GetType().GetField(value.ToString());
            if (fieldInfo == null) return "";

            var attribute = (UIEnumValueAttribute)fieldInfo.GetCustomAttribute(typeof(UIEnumValueAttribute));

            return attribute.Title;
        }
    }
}