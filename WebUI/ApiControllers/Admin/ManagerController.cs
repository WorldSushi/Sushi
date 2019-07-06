using System.Linq;
using System.Threading.Tasks;
using Data;
using Data.Commands.Manager;
using Data.DTO.Users;
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
                    Phone = x.Phone
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
                Phone = manager.Entity.Phone
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
                Password = manager.Password
            };

            return Ok(result);
        }
    }
}