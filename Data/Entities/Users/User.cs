﻿using Base;

namespace Data.Entities.Users
{
    public abstract class User : Entity
    {
        public string Login { get; internal set; }

        public string Password { get; internal set; }
    }
}