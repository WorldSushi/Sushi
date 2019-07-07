using Data.Entities.Users;

namespace WebUI.Services.Abstract
{
    public interface IAccountInformationService
    {
        int GetOperatorId();

        User CurrentUser();

        string GetLayout();
    }
}
