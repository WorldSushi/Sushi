using System;

namespace Base.Attributes
{
    public class UIEnumValueAttribute : Attribute
    {
        public string Title { get; set; }

        public UIEnumValueAttribute()
        {
        }

        public UIEnumValueAttribute(string title)
        {
            Title = title;
        }
    }
}