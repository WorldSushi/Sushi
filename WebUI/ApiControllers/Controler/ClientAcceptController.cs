using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.DTO.Clients;
using Data.DTO.Users;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Enums;
using EnumsNET;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Services.Abstract;

namespace WebUI.ApiControllers.Controler
{
    [Route("api/conroler/[controller]")]
    [ApiController]
    public class ClientAcceptController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IAccountInformationService _accountInformationService;

        public ClientAcceptController(ApplicationContext context,
            IAccountInformationService accountInformationService)
        {
            _context = context;
            _accountInformationService = accountInformationService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(GetAcceptCalls());
        }

        [HttpGet]
        [Route("AcceptManager")]
        public IActionResult GetAcceptManager(string dateStart, string dateEnd, string direction, string txtNumber, string durationTxt, string managerId)
        {
            List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
            List<Call> calls = _context.Set<Call>().ToList();
            List<ClientPhone> clientPhones = _context.Set<ClientPhone>().ToList();
            List<Client> clients = _context.Set<Client>().ToList();
            DateTime dateStartTime = Convert.ToDateTime(dateStart);
            DateTime dateEndTime = Convert.ToDateTime(dateEnd);
            List<Data.Entities.Users.Manager> managers = _context
                .Set<Data.Entities.Users.Manager>().Where(m => m.typeManager == TypeManager.Manager).ToList();
            List<object> acceptManager = new List<object>();
            List<AcceptCallsDto> colleCallsDate = GetAcceptCalls();
               colleCallsDate = colleCallsDate
                    .Where(c => (Convert.ToDateTime(c.Date).Date >= dateStartTime.Date && Convert.ToDateTime(c.Date).Date <= dateEndTime.Date)
                && ((direction == null || direction == "") || direction == c.Direction)
                && (txtNumber == null || txtNumber == "" || c.Phone.IndexOf(txtNumber) != -1 || c.TitleClient.IndexOf(txtNumber) != -1)
                && (Convert.ToInt32(durationTxt) == -1 || Convert.ToInt32(durationTxt) <= c.Durations)
                && (Convert.ToInt32(managerId) == 0 || Convert.ToInt32(managerId) == c.ManagerId))
                    .ToList();
                colleCallsDate = colleCallsDate.OrderBy(r => Convert.ToDateTime(r.Date)).ToList();
            return Ok(colleCallsDate);
        }

        //[HttpGet]
        //[Route("StatistickCall")]
        //public IActionResult GetStatistickCall()
        //{
        //    List<object> StatistickCalls = new List<object>();
        //    List<WorkGroup> workGroups = _context.Set<WorkGroup>().ToList();
        //    List<Data.Entities.Users.Manager> managers = _context.Set<Data.Entities.Users.Manager>().ToList();
        //    List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
        //    List<Call> calls = _context.Set<Call>().ToList();
        //    List<ClientPhone> clientPhones = _context.Set<ClientPhone>().ToList();
        //    List<Client> clients = _context.Set<Client>().ToList();
        //    List<AcceptCallsDto> clientContacts = GetAcceptCalls();
        //    foreach (WorkGroup workGroup in workGroups)
        //    {
        //        List<AcceptCallsDto> clientContacts1 = clientContacts
        //            .Where(c => c.ManagerId == workGroup.RegionalManagerId || c.ManagerId == workGroup.EscortManagerId).ToList();
        //        StatistickCalls.Add(new
        //        {
        //            WorkgroupId = workGroup.Id,
        //            Title = workGroup.Title,
        //            EscortManagerId = workGroup.EscortManagerId,
        //            EscortManagerName = managers.First(m => m.Id == workGroup.EscortManagerId).Login,
        //            RegionalManagerId = workGroup.RegionalManagerId,
        //            RegionalManagerName = managers.First(m => m.Id == workGroup.RegionalManagerId).Login,
        //            ClientAccepts = clientContacts1
        //        });
        //    }
        //    return Ok(StatistickCalls);
        //}

        [HttpGet]
        [Route("StatistickCall")]
        public IActionResult GetStatistickCall1(string dayData, string year, string monthe, string week, string startDate, string endDate)
        {
            int yearNum = Convert.ToInt32(year);
            int montheNum = Convert.ToInt32(monthe) + 1;
            int weekNum = Convert.ToInt32(week);
            DateTime dateDay = Convert.ToDateTime(dayData);
            DateTime dateStart = Convert.ToDateTime(startDate);
            DateTime dateEnd = Convert.ToDateTime(endDate);
            List<ManagerStatistikDTO> StatistickCalls = new List<ManagerStatistikDTO>();
            List<WorkGroup> workGroups = _context.Set<WorkGroup>().ToList();
            List<Data.Entities.Users.Manager> managers = _context.Set<Data.Entities.Users.Manager>().ToList();
            List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
            List<Call> calls = _context.Set<Call>().ToList();
            List<ClientPhone> clientPhones = _context.Set<ClientPhone>().ToList();
            List<Client> clients = _context.Set<Client>().ToList();
            List<AcceptCallsDto> clientContacts = GetAcceptCalls();
            foreach (WorkGroup workGroup in workGroups)
            {
                StatistickCalls.Add(new ManagerStatistikDTO()
                {
                    WorkgroupId = workGroup.Id,
                    WorkgroupTitle = workGroup.Title,
                    EscortManagerId = workGroup.EscortManagerId,
                    EscortManagerName = managers.First(m => m.Id == workGroup.EscortManagerId).Login,
                    RegionalManagerId = workGroup.RegionalManagerId,
                    RegionalManagerName = managers.First(m => m.Id == workGroup.RegionalManagerId).Login,
                    CallStatistRMDTO = new CallStatisticDTO()
                    {
                        StartWork = GetStartWorkManager(clientContacts.Where(c => Convert.ToDateTime(c.Date).Date == dateDay.Date && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && c.ManagerId == workGroup.RegionalManagerId 
                        && (c.Direction == "Исходящий" || (c.Direction == "Входящий" && c.Durations > 0))).ToList()),
                        EndWork = GetEndWorkManager(clientContacts.Where(c => Convert.ToDateTime(c.Date).Date == dateDay.Date && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && c.ManagerId == workGroup.RegionalManagerId
                        && (c.Direction == "Исходящий" || (c.Direction == "Входящий" && c.Durations > 0))).ToList()),

                        CountCallAllToday = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date).Date == dateDay.Date).Count().ToString(),
                        CountCallAllWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum 
                        && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum).Count().ToString(),
                        CountCallAllMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum).Count().ToString(),
                        CountCallAllPeriod = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart).Count().ToString(),

                        CountCallMore2and5ToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail 
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations >= 150).Count().ToString(),
                        CountCallMore2and5Week = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations >= 150).Count().ToString(),
                        CountCallMore2and5Monthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations >= 150).Count().ToString(),
                        CountCallMore2and5Period = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations >= 150).Count().ToString(),

                        CountCallSmale2and5More10sToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),
                        CountCallSmale2and5More10sWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),
                        CountCallSmale2and5More10sMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),
                        CountCallSmale2and5More10sPerio = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),

                        CountCallSmale10sToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations <= 10).Count().ToString(),
                        CountCallSmale10sWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations <= 10).Count().ToString(),
                        CountCallSmale10sMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations <= 10).Count().ToString(),
                        CountCallSmale10sPeriod = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations <= 10).Count().ToString(),

                        CountCallDevelopmentToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date).Date == dateDay.Date).Count().ToString(),
                        CountCallDevelopmentWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum).Count().ToString(),
                        CountCallDevelopmentsMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum).Count().ToString(),
                        CountCallDevelopmentPeriod = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart).Count().ToString(),

                        CountCallColleaguesToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date).Date == dateDay.Date).Count().ToString(),
                        CountCallColleaguestWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum).Count().ToString(),
                        CountCallColleaguesMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum).Count().ToString(),
                        CountCallColleaguesPeriod = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart).Count().ToString(),

                        CountCallOutgoingToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId &&  c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Direction == "Исходящий").Count().ToString(),
                        CountCallOutgoingWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum &&  c.Direction == "Исходящий").Count().ToString(),
                        CountCallOutgoingMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Direction == "Исходящий").Count().ToString(),
                        CountCallOutgoingPeriod = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Direction == "Исходящий").Count().ToString(),

                        CountCallInboxToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Direction == "Входящий").Count().ToString(),
                        CountCallInboxWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Direction == "Входящий").Count().ToString(),
                        CountCallInboxMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId  && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Direction == "Входящий").Count().ToString(),
                        CountCallInboxPeriod = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Direction == "Входящий").Count().ToString(),

                        CountCallUnansweredToDay = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations == 0).Count().ToString(),
                        CountCallUnansweredWeek = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations == 0).Count().ToString(),
                        CountCallUnansweredMonthe = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations == 0).Count().ToString(),
                        CountCallUnansweredPeriod = clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations == 0).Count().ToString(),

                        CountCallDurationToDay = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date)
                        .Select(x => x.Durations).Sum()).ToString(),
                        CountCallDurationWeek = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum)
                        .Select(x => x.Durations).Sum()).ToString(),
                        CountCallDurationMonthe = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum)
                        .Select(x => x.Durations).Sum()).ToString(),
                        CountCallDurationPeriod = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.RegionalManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart)
                        .Select(x => x.Durations).Sum()).ToString(),

                    },
                    
                    CallStatistiMCDTO = new CallStatisticDTO()
                    {
                        StartWork = GetStartWorkManager(clientContacts.Where(c => Convert.ToDateTime(c.Date).Date == dateDay.Date && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && c.ManagerId == workGroup.EscortManagerId
                        && (c.Direction == "Исходящий" || (c.Direction == "Входящий" && c.Durations > 0))).ToList()),
                        EndWork = GetEndWorkManager(clientContacts.Where(c => Convert.ToDateTime(c.Date).Date == dateDay.Date && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && c.ManagerId == workGroup.EscortManagerId
                        && (c.Direction == "Исходящий" || (c.Direction == "Входящий" && c.Durations > 0))).ToList()),

                        CountCallAllToday = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date).Date == dateDay.Date).Count().ToString(),
                        CountCallAllWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum
                        && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum).Count().ToString(),
                        CountCallAllMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum).Count().ToString(),
                        CountCallAllPeriod = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart).Count().ToString(),

                        CountCallMore2and5ToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations >= 150).Count().ToString(),
                        CountCallMore2and5Week = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations >= 150).Count().ToString(),
                        CountCallMore2and5Monthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations >= 150).Count().ToString(),
                        CountCallMore2and5Period = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations >= 150).Count().ToString(),

                        CountCallSmale2and5More10sToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),
                        CountCallSmale2and5More10sWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),
                        CountCallSmale2and5More10sMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),
                        CountCallSmale2and5More10sPerio = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations <= 150 && c.Durations >= 10).Count().ToString(),

                        CountCallSmale10sToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations <= 10).Count().ToString(),
                        CountCallSmale10sWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations <= 10).Count().ToString(),
                        CountCallSmale10sMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations <= 10).Count().ToString(),
                        CountCallSmale10sPeriod = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.ManagerCall && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations <= 10).Count().ToString(),

                        CountCallDevelopmentToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date).Date == dateDay.Date).Count().ToString(),
                        CountCallDevelopmentWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum).Count().ToString(),
                        CountCallDevelopmentsMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum).Count().ToString(),
                        CountCallDevelopmentPeriod = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.AcceptCall && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart).Count().ToString(),

                        CountCallColleaguesToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date).Date == dateDay.Date).Count().ToString(),
                        CountCallColleaguestWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum).Count().ToString(),
                        CountCallColleaguesMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum).Count().ToString(),
                        CountCallColleaguesPeriod = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType == ClientContactType.ManagerCall && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart).Count().ToString(),

                        CountCallOutgoingToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Direction == "Входящий").Count().ToString(),
                        CountCallOutgoingWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Direction == "Входящий").Count().ToString(),
                        CountCallOutgoingMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Direction == "Входящий").Count().ToString(),
                        CountCallOutgoingPeriod = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Direction == "Входящий").Count().ToString(),

                        CountCallInboxToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Direction == "Исходящий").Count().ToString(),
                        CountCallInboxWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Direction == "Исходящий").Count().ToString(),
                        CountCallInboxMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Direction == "Исходящий").Count().ToString(),
                        CountCallInboxPeriod = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Direction == "Исходящий").Count().ToString(),

                        CountCallUnansweredToDay = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date && c.Durations == 0).Count().ToString(),
                        CountCallUnansweredWeek = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum && c.Durations == 0).Count().ToString(),
                        CountCallUnansweredMonthe = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && c.Durations == 0).Count().ToString(),
                        CountCallUnansweredPeriod = clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart && c.Durations == 0).Count().ToString(),

                        CountCallDurationToDay = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Date == dateDay.Date)
                        .Select(x => x.Durations).Sum()).ToString(),
                        CountCallDurationWeek = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum && GetWeekOfMonth(Convert.ToDateTime(c.Date)) == weekNum)
                        .Select(x => x.Durations).Sum()).ToString(),
                        CountCallDurationMonthe = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date).Year == yearNum && Convert.ToDateTime(c.Date).Month == montheNum)
                        .Select(x => x.Durations).Sum()).ToString(),
                        CountCallDurationPeriod = TimeSpan.FromSeconds(clientContacts.Where(c => c.ManagerId == workGroup.EscortManagerId && c.ContactType != ClientContactType.WhatsUp && c.ContactType != ClientContactType.Mail
                        && Convert.ToDateTime(c.Date) <= dateEnd && Convert.ToDateTime(c.Date) >= dateStart)
                        .Select(x => x.Durations).Sum()).ToString(),
                    }
                });
            }

            return Ok(StatistickCalls);
        }

        private string GetEndWorkManager(List<AcceptCallsDto> acceptCallsDtos)
        {
            string endWork = "---------";
            if(acceptCallsDtos != null && acceptCallsDtos.Count != 0)
            {
                DateTime tmpData = Convert.ToDateTime(acceptCallsDtos[0].Date);
                foreach(AcceptCallsDto acceptCallsDto in acceptCallsDtos)
                {
                    if(tmpData < Convert.ToDateTime(acceptCallsDto.Date))
                    {
                        tmpData = Convert.ToDateTime(acceptCallsDto.Date);
                    }
                }
                endWork = tmpData.ToString();
            }
            return endWork;
        }

        private string GetStartWorkManager(List<AcceptCallsDto> acceptCallsDtos)
        {
            string startWork = "---------";
            if (acceptCallsDtos != null && acceptCallsDtos.Count != 0)
            {
                DateTime tmpData = Convert.ToDateTime(acceptCallsDtos[0].Date);
                foreach (AcceptCallsDto acceptCallsDto in acceptCallsDtos)
                {
                    if (tmpData > Convert.ToDateTime(acceptCallsDto.Date))
                    {
                        tmpData = Convert.ToDateTime(acceptCallsDto.Date);
                    }
                }
                startWork = tmpData.ToString();
            }
            return startWork;
        }

        private int GetWeekOfMonth(DateTime date)
        {
            DateTime beginningOfMonth = new DateTime(date.Year, date.Month, 1);
            while (date.Date.AddDays(1).DayOfWeek != System.Globalization.CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek)
                date = date.AddDays(1);
            return (int)Math.Truncate((double)date.Subtract(beginningOfMonth).TotalDays / 7f);
        }

        [HttpGet]
        [Route("Client")]
        public IActionResult GetClient()
        {
            List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
            List<ClientWorkGroup> clientWorkGroups = _context.Set<ClientWorkGroup>().ToList();
            List<WeekPlan> weekPlans = _context.Set<WeekPlan>().ToList();
            var clients = _context.Set<Client>()
                .Select(x => new
                {
                    Id = x.Id,
                    WorkGroupeId = clientWorkGroups.FirstOrDefault(c => c.ClientId == x.Id) != null ? clientWorkGroups.FirstOrDefault(c => c.ClientId == x.Id).WorkGroupId : 0,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    WeeklyPlanSRegional = new { }, //weekPlans.Where(w => w.ClientId == x.Id && w.ManagerType == ManagerType.RegionalManager).ToList(),
                    WeeklyPlanSEscort = new { }, //weekPlans.Where(w => w.ClientId == x.Id && w.ManagerType == ManagerType.EscortManager).ToList()
                    CallsComments = callsComments.Where(c => c.ClientId == x.Id && c.Type == "План" && DateHelper.IsCurrentMonth(Convert.ToDateTime(c.Date))).ToList()
                }).ToList();
            return Ok(clients);
        }

        [HttpGet]
        [Route("Clients")]
        public async Task<IActionResult> GetClients()
        {
            List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
            var clientPhones = await _context.Set<ClientPhone>()
                .ToListAsync();
            var result = await _context.Set<Client>()
                .Select(x => new 
                {
                    Id = x.Id,
                    Title = x.Title,
                    LegalEntity = x.LegalEntity,
                    Phones = clientPhones.Where(z => z.ClientId == x.Id).Select(z => new ClientPhoneDTO
                    {
                        Id = z.Id,
                        Phone = z.Phone
                    }).ToList(),
                    ClientType = x.ClientType.AsString(EnumFormat.Description),
                    NumberOfCalls = x.NumberOfCalls.AsString(EnumFormat.Description),
                    Group = (int)x.Group,
                    NumberOfShipments = x.NumberOfShipments.AsString(EnumFormat.Description),
                    HasWorkgroup = _context.Set<ClientWorkGroup>().Any(z => z.ClientId == x.Id),
                    ContactName = _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.Id) != null ? _context.Set<ContactName>().FirstOrDefault(c => c.ClientId == x.Id).Name : "",
                    CallsComments = callsComments.FirstOrDefault(c => c.ClientId == x.Id && c.Type == "Клиент")
                }).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        [Route("NoAcceptCallWeekPlan")]
        public void NoAcceptCallWeekPlan(string comment, string clientId, int weekNumber)
        {
            string color = null;
            if (_accountInformationService.CurrentUser() is Data.Entities.Users.Manager)
            {
                color = ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "1" ? "black" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "2" ? "lightskyblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "3" ? "blue" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "4" ? "blueviolet"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "5" ? "brown" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "6" ? "chocolate"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "7" ? "coral" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "8" ? "darkblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "9" ? "deeppink" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "10" ? "gold"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "11" ? "green" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "12" ? "tomato"
                : "black";
            }
            else
            {
                color = "black";
            }
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.Type == "План" && DateHelper.IsCurrentMonth(Convert.ToDateTime(c.Date)) && c.WeekNumber == weekNumber );
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept;
                callsComment.ColorPen = color;
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ColorPen = color,
                    Type = "План",
                    WeekNumber = weekNumber,
                    Date = DateTime.Now.ToString()
                });
            }
            _context.SaveChanges();
        }


        [HttpGet]
        [Route("DefaultCallWeekPlan")]
        public void DefaultCallWeekPlan(string comment, string clientId, int weekNumber)
        {
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.Type == "План" && DateHelper.IsCurrentMonth(Convert.ToDateTime(c.Date)) && c.WeekNumber == weekNumber);
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.Default;

            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.Default,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    Type = "План",
                    WeekNumber = weekNumber,
                    Date = DateTime.Now.ToString()
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("NoAcceptCallClient")]
        public void NoAcceptCallClient(string comment, string clientId)
        {
            string color = null;
            if (_accountInformationService.CurrentUser() is Data.Entities.Users.Manager)
            {
                color = ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "1" ? "black" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "2" ? "lightskyblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "3" ? "blue" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "4" ? "blueviolet"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "5" ? "brown" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "6" ? "chocolate"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "7" ? "coral" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "8" ? "darkblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "9" ? "deeppink" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "10" ? "gold"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "11" ? "green" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "12" ? "tomato"
                : "black";
            }
            else
            {
                color = "black";
            }
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.Type == "Клиент");
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept;
                callsComment.ColorPen = color;
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ColorPen = color,
                    Type = "Клиент"
                }); ;
            }
            _context.SaveChanges();
        }


        [HttpGet]
        [Route("DefaultCallClient")]
        public void DefaultCallClient(string comment, string clientId)
        {
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.Type == "Клиент");
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.Default;

            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.Default,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    Type = "Клиент"
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("NoAcceptCall")]
        public void NoAcceptCall(string comment, string callId, string clientId)
        {
            string color = null;
            if(_accountInformationService.CurrentUser() is Data.Entities.Users.Manager)
            {
                color = ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "1" ? "black" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "2" ? "lightskyblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "3" ? "blue" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "4" ? "blueviolet"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "5" ? "brown" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "6" ? "chocolate"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "7" ? "coral" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "8" ? "darkblue"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "9" ? "deeppink" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "10" ? "gold"
                : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "11" ? "green" : ((Data.Entities.Users.Manager)_accountInformationService.CurrentUser()).ColorPen == "12" ? "tomato"
                : "black";
            }
            else
            {
                color = "black";
            }
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.ContactClientId.ToString() == callId && c.Type == "Звонок");
            if(callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept;
                callsComment.ColorPen = color;
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.ControlerNoAccept,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ContactClientId  = Convert.ToInt32(callId),
                    ColorPen = color,
                    Type = "Звонок"
                });;
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("DefaultCall")]
        public void DefaultCall(string comment, string callId, string clientId)
        {
            CallsComment callsComment = _context.Set<CallsComment>().FirstOrDefault(c => c.ClientId.ToString() == clientId && c.ContactClientId.ToString() == callId && c.Type == "Звонок");
            if (callsComment != null)
            {
                callsComment.Comment = comment;
                callsComment.AcceptControlerCalss = AcceptControlerCalss.Default;
               
            }
            else
            {
                _context.Set<CallsComment>().Add(new CallsComment()
                {
                    AcceptControlerCalss = AcceptControlerCalss.Default,
                    Comment = comment,
                    ClientId = Convert.ToInt32(clientId),
                    ContactClientId = Convert.ToInt32(callId),
                    Type = "Звонок"
                });
            }
            _context.SaveChanges();
        }

        private List<AcceptCallsDto> GetAcceptCalls()
        {
            List<CallsComment> callsComments = _context.Set<CallsComment>().ToList();
            List<Call> calls = _context.Set<Call>().ToList();
            List<ClientPhone> clientPhones = _context.Set<ClientPhone>().ToList();
            List<Client> clients = _context.Set<Client>().ToList();
            List<Data.Entities.Users.Manager> managers = _context.Set<Data.Entities.Users.Manager>().ToList();

            var result1 = _context.Set<ClientContact>().ToList();

            var result = _context.Set<ClientContact>()
                .Select(x => new AcceptCallsDto()
                {
                    Id = x.Id,
                    ClientId = (int)x.ClientId,
                    ContactType = x.Type,
                    Date = x.Date.ToString("dd.MM.yyyy HH:mm:ss"),
                    ManagerType = x.ManagerType,
                    ManagerId = x.ManagerId,
                    Durations = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallClient)calls.FirstOrDefault(c => c.Id == x.CallId)).Duration : 0,
                    ReferenceAudioVoice = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallClient)calls.FirstOrDefault(c => c.Id == x.CallId)).Recording : "",
                    TitleClient = clients.FirstOrDefault(c => c.Id == x.ClientId) != null ? clients.FirstOrDefault(c => c.Id == x.ClientId).Title : "",
                    Phone = clientPhones.FirstOrDefault(c => c.ClientId == x.ClientId) != null ? clientPhones.FirstOrDefault(c => c.ClientId == x.ClientId).Phone : "",
                    Direction = x.Direction == "0" ? "Входящий" : x.Direction == "1" ? "Исходящий" : "Неизвестно",
                    CallsComments = callsComments.FirstOrDefault(c => c.ClientId == x.ClientId && c.ContactClientId == x.Id && c.Type == "Звонок"),
                    StatusContact = callsComments.FirstOrDefault(c => c.ClientId == x.ClientId && c.ContactClientId == x.Id) != null
                       ? Convert.ToInt32(callsComments.FirstOrDefault(c => c.ClientId == x.ClientId && c.ContactClientId == x.Id).AcceptControlerCalss)
                       : 0
                }).ToList();
            result.AddRange(_context.Set<ContactManager>()
                .Select(x => new AcceptCallsDto()
                {
                    Id = x.Id,
                    ClientId = (int)x.ManagerIdC,
                    ContactType = x.Type,
                    Date = x.Date.ToString("dd.MM.yyyy HH:mm:ss"),
                    ManagerType = x.ManagerType,
                    ManagerId = x.ManagerId,
                    Durations = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallManager)calls.FirstOrDefault(c => c.Id == x.CallId)).Duration : 0,
                    ReferenceAudioVoice = calls.FirstOrDefault(c => c.Id == x.CallId) != null ? ((CallManager)calls.FirstOrDefault(c => c.Id == x.CallId)).Recording : "",
                    TitleClient = managers.FirstOrDefault(m => m.Id == x.ManagerIdC) != null ? managers.FirstOrDefault(m => m.Id == x.ManagerIdC).Login : "",
                    Phone = managers.FirstOrDefault(m => m.Id == x.ManagerIdC) != null ? managers.FirstOrDefault(m => m.Id == x.ManagerIdC).Phone : "",
                    Direction = x.Direction == "1" ? "Входящий" : x.Direction == "0" ? "Исходящий" : "Неизвестно"
                }).ToList());
            result = result.OrderBy(r => Convert.ToDateTime(r.Date)).ToList();
            return result;
        }
    }
}