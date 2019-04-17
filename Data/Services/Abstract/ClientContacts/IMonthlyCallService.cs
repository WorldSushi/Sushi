namespace Data.Services.Abstract.ClientContacts
{
    public interface IMonthlyCallService
    {
        int GetMonthlyCalls(int managerId, int clientId, int month);
    }
}