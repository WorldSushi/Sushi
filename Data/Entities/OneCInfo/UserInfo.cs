using System;
using Base;
using Data.Entities.Users;

namespace Data.Entities.OneCInfo
{
    public class UserInfo : Entity
    {
        public int UserId { get; protected set; }
        public User User { get; protected set; }   

        public Guid OneCId { get; protected set; }

        protected UserInfo()
        {

        }

        public UserInfo(int userId, Guid oneCId)
        {
            UserId = userId;
            OneCId = oneCId;
        }

        public UserInfo(User user, Guid oneCId)
        {
            User = user;
            OneCId = oneCId;
        }
    }
}