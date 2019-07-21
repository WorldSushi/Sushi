namespace Data.DTO.Users
{
    public class ManagerDto
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public int? WorkgroupId { get; set; }
        public string WorkgroupTitle { get; set; }
    }
}
