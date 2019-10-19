using Data;
using Data.Commands.ClientContacts.WorkGroup;
using Data.Commands.Clients;
using Data.Entities.ClientContacts;
using Data.Entities.Clients;
using Data.Entities.OneCInfo;
using Data.Entities.Users;
using Data.Enums;
using FluentScheduler;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebUI.Background.SyncRonService.Model.Contragent;

namespace WebUI.Background.SyncRonService
{
    public class SyncClient : IJob
    {
        private HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://mir-sushi-web.esit.info/buh5/ru_RU/odata/standard.odata/InformationRegister_CRM_Contragents?$format=json");
        private readonly ApplicationContext _context;

        public SyncClient(ApplicationContext context)
        {
            _context = context;
        }

        public void Execute()
        {
            request.UserAgent = "World Sushi";
            System.Net.ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
            request.Credentials = new NetworkCredential("chuprina.r.v@gmail.com", "123");
            Task.Run(() => WorkSyncClient());
        }

        private void WorkSyncClient()
        {
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            Stream receiveStream = response.GetResponseStream();
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            string content = readStream.ReadToEnd();
            var responseAppS = JObject.Parse(content);
            List<Model.Contragent.Client> clients = JsonConvert.DeserializeObject<List<Model.Contragent.Client>>(responseAppS.
                        SelectToken("value").ToString());
            //CreateClient(clients);
            //CreateManager(clients);
            //CreateManager1(clients);
            //List<Data.Entities.Clients.Client> clientss = _context.Set<Data.Entities.Clients.Client>().ToList(); 
        }



        private void CreateManager1(List<Model.Contragent.Client> clients)
        {
            List<User> users = _context.Set<User>().ToList();
            var userInfos = JsonConvert.DeserializeObject<List<UserI>>(File.ReadAllText("userInfos.json"));
            foreach (UserI userI in userInfos)
            {
                User user = users.FirstOrDefault(u => u.Id == userI.UserId);
                if (user != null)
                {
                    _context.Set<Data.Entities.OneCInfo.UserInfo>().Add(new UserInfo(user, userI.OneCId));
                    _context.SaveChanges();
                }

            }
        }

        private void CreateManager(List<Model.Contragent.Client> clients)
        {
            var userInfos = _context.Set<Data.Entities.OneCInfo.UserInfo>()
                  .Where(x => x.UserId != 1 && x.UserId != 11)
                  .ToList();
            File.WriteAllText("userInfos.json", JsonConvert.SerializeObject(userInfos));
        }

        private async void CreateClient(List<Model.Contragent.Client> clients)
        {
            //_context.Set<Data.Entities.OneCInfo.ClientInfo>().RemoveRange(_context.Set<Data.Entities.OneCInfo.ClientInfo>());
            //_context.Set<Data.Entities.Clients.Client>().RemoveRange(_context.Set<Data.Entities.Clients.Client>());
            //_context.Set<Data.Entities.Clients.ClientPhone>().RemoveRange(_context.Set<Data.Entities.Clients.ClientPhone>());
            //_context.Set<Data.Entities.Clients.ClientGR>().RemoveRange(_context.Set<Data.Entities.Clients.ClientGR>());
            //_context.SaveChanges();
            int i = 0;
            //clients.RemoveRange(0, 800);
            var userInfos = _context.Set<Data.Entities.OneCInfo.UserInfo>()
                  .ToList();
            foreach (Model.Contragent.Client client in clients)
            {
                i++;
                File.WriteAllText("i.txt", i.ToString());
                try
                {
                    ClientInfo clientInfo1 = _context.Set<ClientInfo>().FirstOrDefault(c => c.OneCId.ToString() == client.Contragent_ID);
                    Data.Entities.Clients.Client client1 = _context.Set<Data.Entities.Clients.Client>().FirstOrDefault(c => clientInfo1 != null && clientInfo1.ClientId == c.Id);
                    if (client1 == null)
                    {
                        NumberOfCalls numberOfCalls = client.Periodichnost_Zvonkov == "0" ? NumberOfCalls.WithoutType : client.Periodichnost_Zvonkov == "10" ? NumberOfCalls.OnePerMonth : client.Periodichnost_Zvonkov == "20"
                            ? NumberOfCalls.OnePerTwoWeek : client.Periodichnost_Zvonkov == "30" ? NumberOfCalls.ThreePerMonth : client.Periodichnost_Zvonkov == "40" ? NumberOfCalls.OnePerWeek : client.Periodichnost_Zvonkov == "50" ?
                            NumberOfCalls.FivePerMonth : client.Periodichnost_Zvonkov == "60" ? NumberOfCalls.SixPerMonth : client.Periodichnost_Zvonkov == "90" ? NumberOfCalls.TwoPerWeek : NumberOfCalls.WithoutType;

                        NumberOfShipments numberOfShipments = client.Periodichnost_Otgruzok == "0" ? NumberOfShipments.WithoutType : client.Periodichnost_Zvonkov == "10" ? NumberOfShipments.OnePerMonth : client.Periodichnost_Zvonkov == "20"
                           ? NumberOfShipments.OnePerTwoWeek : client.Periodichnost_Zvonkov == "30" ? NumberOfShipments.ThreePerMonth : client.Periodichnost_Zvonkov == "40" ? NumberOfShipments.OnePerWeek : client.Periodichnost_Zvonkov == "50" ?
                           NumberOfShipments.FivePerMonth : client.Periodichnost_Zvonkov == "60" ? NumberOfShipments.SixPerMonth : client.Periodichnost_Zvonkov == "90" ? NumberOfShipments.TwoPerWeek : NumberOfShipments.WithoutType;

                        client1 = _context.Set<Data.Entities.Clients.Client>()
                                                       .Add(new Data.Entities.Clients.Client(new ClientCreate()
                                                       {
                                                           ClientType = ClientTypes.Middle1,
                                                           Title = client.Contragent,
                                                           LegalEntity = client.Contragent_NameFull,
                                                           NumberOfCalls = numberOfCalls,
                                                           NumberOfShipments = numberOfShipments,
                                                           Group = ClientGroup.NewOrReanimated

                                                       })).Entity;
                        client1.IsAcctive = true;
                        clientInfo1 = _context.Set<ClientInfo>()
                                            .Add(new ClientInfo(client1.Id, Guid.Parse(client.Contragent_ID), client.Phones)).Entity;
                        await _context.SaveChangesAsync();
                        _context.Set<ClientGR>().Add(new ClientGR()
                        {
                            Client = client1,
                            ClientId = client1.Id,
                            NameGr = client.GR_Contragent
                        });
                        await _context.SaveChangesAsync();
                        if (client.Manager_ID != null && client.Manager_ID != "")
                        {
                            var managersGuidStr = client.Manager_ID.Split(',');
                            var managersGuid = new List<Guid>();
                            foreach (var str in managersGuidStr)
                            {
                                try
                                {
                                    managersGuid.Add(Guid.Parse(str));
                                }
                                catch
                                {
                                }
                            }

                            var userInfo = userInfos.FirstOrDefault(x => managersGuid.Contains(x.OneCId));

                            if (userInfo != null)
                            {
                                var workGroup = _context.Set<WorkGroup>()
                                    .FirstOrDefault(x => x.RegionalManagerId == userInfo.UserId
                                                         || x.EscortManagerId == userInfo.UserId);

                                workGroup.BindClient(new BindClient()
                                {
                                    ClientId = client1.Id,
                                    WorkgroupId = workGroup.Id
                                });
                            }
                        }
                        await _context.SaveChangesAsync();
                    }
                    if (client.Phones != null && client.Phones != "")
                    {
                        var e = client.Phones.Split(',');
                        var clientPhones = _context.Set<ClientPhone>().Where(c => c.ClientId == clientInfo1.ClientId);
                        foreach (var phone in e)
                        {
                            string newPhone = Regex.Replace(phone, @"[^0-9]", "");
                            if (clientPhones == null || clientPhones.FirstOrDefault(c => c.Phone != null && (c.Phone == newPhone || c.Phone == newPhone.Substring(1) || c.Phone == newPhone.Substring(2))) == null)
                            {

                                ClientPhone clientPhone = null;
                                clientPhone = new ClientPhone()
                                {
                                    Client = client1,
                                    Phone = newPhone,
                                };
                                if (clientPhone != null)
                                    _context.Set<ClientPhone>().Add(clientPhone);
                                await _context.SaveChangesAsync();

                            }
                            else
                            {

                            }
                        }
                    }
                    else
                    {

                    }
                }
                catch (Exception e)
                {

                }
            }
        }
    }
}
