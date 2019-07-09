using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.Commands.Manager;
using Data.Entities.Calls;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Data.Entities.Users;
using Data.Enums;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMyCallsAPIService _myCallsApiService;
        private readonly ApplicationContext _context;

        public HomeController(IMyCallsAPIService myCallsApiService,
            ApplicationContext context)
        {
            _myCallsApiService = myCallsApiService;
            _context = context;
        }

       /* [HttpGet]
        public IActionResult ImportFile()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFile(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.UTF8.GetString(data);
            string[] lines = result.Split('\r');
            
            for (var i = 1; i < lines.Length; i++)
            {
                if (lines[i].Length > 2)
                {
                    lines[i] = lines[i].Substring(1);
                    string[] rows = lines[i].Split(';');

                    var manager = _context.Set<Manager>()
                        .Add(new Manager(
                            new ManagerCreateCommand()
                            {
                                Login = rows[0],
                                Password = "1234",
                                Phone = rows[2]
                            })).Entity;

                    var userInfo = _context.Set<UserInfo>()
                        .AddAsync(new UserInfo(manager, Guid.Parse(rows[1])));
                }
            }

            _context.SaveChanges();

            return RedirectToAction("ImportFile");
        }*/

       /* [HttpGet]
        public IActionResult ImportFileClients()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFileClients(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.UTF8.GetString(data);
            string[] lines = result.Split('\r');


            var userInfos = _context.Set<UserInfo>()
                .Where(x => x.UserId != 1 && x.UserId != 11)
                .ToList();

            for (var i = 1; i < lines.Length; i++)
            {
                if (lines[i].Length > 2)
                {
                    lines[i] = lines[i].Substring(1);
                    string[] rows = lines[i].Split(';');

                    var client = _context.Set<Client>()
                        .Add(new Client(new ClientCreate()
                        {
                            ClientType = ClientTypes.Middle1,
                            Title = rows[0],
                            LegalEntity = rows[1],
                            NumberOfCalls = GetNumberOfCalls(rows[4]),
                            NumberOfShipments = GetNumberOfShipments(rows[5]),
                            Phone = rows[6]
                        })).Entity;

                    var clientInfo = _context.Set<ClientInfo>()
                        .Add(new ClientInfo(client, Guid.Parse(rows[9]), rows[6]));

                    //_context.SaveChanges();

                    if (rows[10] != "")
                    {
                        var managersGuidStr = rows[10].Split(',');
                        var managersGuid = new List<Guid>();
                        foreach (var str in managersGuidStr)
                        {
                            managersGuid.Add(Guid.Parse(str));
                        }

                        var userInfo = userInfos.FirstOrDefault(x => managersGuid.Contains(x.OneCId));

                        if (userInfo != null)
                        {
                            var workGroup = _context.Set<WorkGroup>()
                                .FirstOrDefault(x => x.RegionalManagerId == userInfo.UserId
                                                     || x.EscortManagerId == userInfo.UserId);

                            workGroup.BindClient(new BindClient()
                            {
                                Client = client,
                                WorkGroupId = workGroup.Id
                            });
                        }
                    }
                }
            }

            _context.SaveChanges();

            return RedirectToAction("ImportFileClients");
        }*/

       /* public void InitWorkGroup()
        {
            _context.Set<WorkGroup>()
                .AddRange(
                    new WorkGroup(new WorkGroupCreate()
                    {
                        Title = "Северо-восток",
                        EscortManagerId = 3,
                        RegionalManagerId = 2
                    }),
                    new WorkGroup(new WorkGroupCreate()
                    {
                        Title = "Центр",
                        EscortManagerId = 5,
                        RegionalManagerId = 4
                    }),
                    new WorkGroup(new WorkGroupCreate()
                    {
                        Title = "Юго-запад",
                        EscortManagerId = 7,
                        RegionalManagerId = 6
                    }),
                    new WorkGroup(new WorkGroupCreate()
                    {
                        Title = "Ритейл",
                        EscortManagerId = 9,
                        RegionalManagerId = 8
                    }));

            _context.SaveChanges();
        }

        public void MyCallsTest()
        {
            _myCallsApiService.SaveNewCalls();
        }*/

        public IActionResult Index()
        {
            return Redirect("/Account/Index");
        }

        private NumberOfCalls GetNumberOfCalls(string numberStr)
        {
            if (numberStr == "")
                return NumberOfCalls.WithoutType;

            var number = float.Parse(numberStr);

            if (number <= 0)
                return NumberOfCalls.WithoutType;
            if (number > 0 && number < 2)
                return NumberOfCalls.OnePerMonth;
            if (number >= 2 && number < 3)
                return NumberOfCalls.OnePerTwoWeek;
            if (number >= 3 && number < 4)
                return NumberOfCalls.ThreePerMonth;
            if (number >= 4 && number < 5)
                return NumberOfCalls.OnePerWeek;
            if (number >= 5 && number < 6)
                return NumberOfCalls.FivePerMonth;
            if (number >= 6 && number < 8)
                return NumberOfCalls.SixPerMonth;
            if (number >= 8)
                return NumberOfCalls.TwoPerWeek;

            return NumberOfCalls.WithoutType;
        }

        private NumberOfShipments GetNumberOfShipments(string numberStr)
        {
            if (numberStr == "")
                return NumberOfShipments.WithoutType;

            var number = float.Parse(numberStr);

            if (number <= 0)
                return NumberOfShipments.WithoutType;
            if (number > 0 && number < 2)
                return NumberOfShipments.OnePerMonth;
            if (number >= 2 && number < 3)
                return NumberOfShipments.OnePerTwoWeek;
            if (number >= 3 && number < 4)
                return NumberOfShipments.ThreePerMonth;
            if (number >= 4 && number < 5)
                return NumberOfShipments.OnePerWeek;
            if (number >= 5 && number < 6)
                return NumberOfShipments.FivePerMonth;
            if (number >= 6 && number < 8)
                return NumberOfShipments.SixPerMonth;
            if (number >= 8)
                return NumberOfShipments.TwoPerWeek;

            return NumberOfShipments.WithoutType;
        }
    }
}