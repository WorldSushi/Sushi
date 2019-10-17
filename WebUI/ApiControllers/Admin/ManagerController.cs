using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.Manager;
using Data.DTO.Users;
using Data.Entities.ClientContacts;
using Data.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class ManagerController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ManagerController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Set<Data.Entities.Users.Manager>()
                .Select(x => new ManagerDto()
                {
                    Id = x.Id,
                    Login = x.Login,
                    Password = x.Password,
                    Phone = x.Phone,
                    WorkgroupId = _context.Set<WorkGroup>().FirstOrDefault(z => z.EscortManagerId == x.Id || z.RegionalManagerId == x.Id).Id,
                    WorkgroupTitle = _context.Set<WorkGroup>().FirstOrDefault(z => z.EscortManagerId == x.Id || z.RegionalManagerId == x.Id).Title,
                    TypeManager = x.typeManager == Data.Enums.TypeManager.Admin ? 1 : x.typeManager == Data.Enums.TypeManager.Manager ? 2 : x.typeManager == Data.Enums.TypeManager.Marketolog ? 3 : x.typeManager == Data.Enums.TypeManager.Call_Checker ? 4 : 5,
                    ColorPen = x.ColorPen != null ? Convert.ToInt32(x.ColorPen):0
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ManagerCreateCommand command)
        {
            var manager = await _context.Set<Data.Entities.Users.Manager>()
                .AddAsync(new Data.Entities.Users.Manager(command));

            await _context.SaveChangesAsync();

            var result = new ManagerDto()
            {
                Id = manager.Entity.Id,
                Login = manager.Entity.Login,
                Password = manager.Entity.Password,
                Phone = manager.Entity.Phone,
                WorkgroupId = _context.Set<WorkGroup>().FirstOrDefault(x => x.EscortManagerId == manager.Entity.Id || x.RegionalManagerId == manager.Entity.Id)?.Id,
                WorkgroupTitle = _context.Set<WorkGroup>().FirstOrDefault(x => x.EscortManagerId == manager.Entity.Id || x.RegionalManagerId == manager.Entity.Id)?.Title,
                TypeManager = manager.Entity.typeManager == Data.Enums.TypeManager.Manager ? 2 : manager.Entity.typeManager == Data.Enums.TypeManager.Marketolog ? 3 : manager.Entity.typeManager == Data.Enums.TypeManager.Call_Checker ? 4 : 5,
                ColorPen = manager.Entity.ColorPen != null ? Convert.ToInt32(manager.Entity.ColorPen) : 0
            };

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ManagerEditCommand command)
        {
            var manager = await _context.Set<Data.Entities.Users.Manager>()
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            manager.Edit(command);

            await _context.SaveChangesAsync();

            var result = new ManagerDto()
            {
                Id = manager.Id,
                Login = manager.Login,
                Phone = manager.Phone,
                Password = manager.Password,
                WorkgroupId = _context.Set<WorkGroup>().FirstOrDefault(x => x.EscortManagerId == manager.Id || x.RegionalManagerId == manager.Id).Id,
                WorkgroupTitle = _context.Set<WorkGroup>().FirstOrDefault(x => x.EscortManagerId == manager.Id || x.RegionalManagerId == manager.Id)?.Title,
                ColorPen = manager.ColorPen != null ? Convert.ToInt32(manager.ColorPen) : 0
            };

            return Ok(result);
        }
    }
}