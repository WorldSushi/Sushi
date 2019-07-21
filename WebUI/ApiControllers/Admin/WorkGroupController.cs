using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.ClientContacts.WorkGroup;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class WorkGroupController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public WorkGroupController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Set<WorkGroup>()
                .Select(x => new WorkGroupDto()
                {
                    Id = x.Id,
                    Title = x.Title,
                    EscortManagerId = x.EscortManagerId ?? 0,
                    RegionalManagerId = x.RegionalManagerId ?? 0,
                    ClientIds = _context.Set<ClientWorkGroup>()
                        .Where(z => z.WorkGroupId == x.Id)
                        .Select(z => z.ClientId)
                        .ToList()
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WorkGroupCreate command)
        {
            if (await _context.Set<WorkGroup>().AnyAsync(x => x.RegionalManagerId == command.RegionalManagerId
                                                   || x.EscortManagerId == command.EscortManagerId))
                return BadRequest("Менеджер уже задействован в другой группе");

            var workGroup = await _context.Set<WorkGroup>()
                .AddAsync(new WorkGroup(command));

            await _context.SaveChangesAsync();

            var result = new WorkGroupDto()
            {
                EscortManagerId = workGroup.Entity.EscortManagerId ?? 0,
                RegionalManagerId = workGroup.Entity.RegionalManagerId ?? 0
            };

            return Ok(result);
        }

        [HttpPut("ChangeRegionalManager")]
        public async Task<IActionResult> Put([FromBody] ChangeRegionalManager command)
        {
            if (await _context.Set<WorkGroup>().AnyAsync(x => x.RegionalManagerId == command.RegionalManagerId
                                                              || x.EscortManagerId == command.RegionalManagerId))
                return BadRequest("Менеджер уже состоит в другой группе");

            var workGroup = await _context.Set<WorkGroup>()
                .FirstOrDefaultAsync(x => x.Id == command.WorkGroupId);

            if (workGroup == null)
                return BadRequest("Рабочая группа не найдена");

            workGroup.ChangeRegionalManager(command.RegionalManagerId);

            await _context.SaveChangesAsync();

            var result = new WorkGroupDto()
            {
                EscortManagerId = workGroup.EscortManagerId ?? 0,
                RegionalManagerId = workGroup.RegionalManagerId ?? 0
            };

            return Ok(result);
        }

        [HttpPut("ChangeEscortManager")]
        public async Task<IActionResult> Put([FromBody] ChangeEscortManager command)
        {
            if (await _context.Set<WorkGroup>().AnyAsync(x => x.RegionalManagerId == command.EscortManagerId
                                                              || x.EscortManagerId == command.EscortManagerId))
                return BadRequest("Менеджер уже состоит в другой группе");

            var workGroup = await _context.Set<WorkGroup>()
                .FirstOrDefaultAsync(x => x.Id == command.WorkGroupId);

            if (workGroup == null)
                return BadRequest("Рабочая группа не найдена");

            workGroup.ChangeEscortManager(command.EscortManagerId);

            await _context.SaveChangesAsync();

            var result = new WorkGroupDto()
            {
                EscortManagerId = workGroup.EscortManagerId ?? 0,
                RegionalManagerId = workGroup.RegionalManagerId ?? 0
            };

            return Ok(result);
        }

        [HttpPut("BindClient")]
        public async Task<IActionResult> Put([FromBody] BindClient command)
        {
            if (await _context.Set<ClientWorkGroup>().AnyAsync(x => x.ClientId == command.ClientId))
                return BadRequest("Клиет закреплён за другой группой");

            var workGroup = await _context.Set<WorkGroup>()
                .FirstOrDefaultAsync(x => x.Id == command.WorkGroupId);

            if (workGroup == null)
                return BadRequest("Группа не найдёна");

            workGroup.BindClient(command);

            await _context.SaveChangesAsync();

            var result = new WorkGroupDto()
            {
                EscortManagerId = workGroup.EscortManagerId ?? 0,
                RegionalManagerId = workGroup.RegionalManagerId ?? 0
            };

            return Ok(result);
        }
    }
}