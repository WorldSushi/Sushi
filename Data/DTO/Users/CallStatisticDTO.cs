namespace Data.DTO.Users
{
    public class CallStatisticDTO
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public int TypeManager { get; set; }
        public string StartWork { get; set; }
        public string EndWork { get; set; }
        public string CountCallAllToday { get; set; } 
        public string CountCallAllWeek { get; set; }
        public string CountCallAllMonthe { get; set; }
        public string CountCallAllPeriod { get; set; }

        public string CountCallMore2and5ToDay { get; set; }
        public string CountCallMore2and5Week { get; set; }
        public string CountCallMore2and5Monthe { get; set; }
        public string CountCallMore2and5Period { get; set; }

        public string CountCallSmale2and5More10sToDay { get; set; }
        public string CountCallSmale2and5More10sWeek { get; set; }
        public string CountCallSmale2and5More10sMonthe { get; set; }
        public string CountCallSmale2and5More10sPerio { get; set; }

        public string CountCallSmale10sToDay { get; set; }
        public string CountCallSmale10sWeek { get; set; }
        public string CountCallSmale10sMonthe { get; set; }
        public string CountCallSmale10sPeriod { get; set; }

        public string CountCallDevelopmentToDay { get; set; }
        public string CountCallDevelopmentWeek { get; set; }
        public string CountCallDevelopmentsMonthe { get; set; }
        public string CountCallDevelopmentPeriod { get; set; }

        public string CountCallColleaguesToDay { get; set; }
        public string CountCallColleaguestWeek { get; set; }
        public string CountCallColleaguesMonthe { get; set; }
        public string CountCallColleaguesPeriod { get; set; }

        public string CountCallOutgoingToDay { get; set; }
        public string CountCallOutgoingWeek { get; set; }
        public string CountCallOutgoingMonthe { get; set; }
        public string CountCallOutgoingPeriod { get; set; }

        public string CountCallInboxToDay { get; set; }
        public string CountCallInboxWeek { get; set; }
        public string CountCallInboxMonthe { get; set; }
        public string CountCallInboxPeriod { get; set; }

        public string CountCallUnansweredToDay { get; set; }
        public string CountCallUnansweredWeek { get; set; }
        public string CountCallUnansweredMonthe { get; set; }
        public string CountCallUnansweredPeriod { get; set; }

        public string CountCallDurationToDay { get; set; }
        public string CountCallDurationWeek { get; set; }
        public string CountCallDurationMonthe { get; set; }
        public string CountCallDurationPeriod { get; set; }
    }
}