using Data;
using FluentScheduler;
using WebUI.Background.Report;

namespace WebUI.Background
{
    public class MyRegistry : Registry
    {
        public MyRegistry(ApplicationContext applicationContext)
        {
            //Schedule<SalesReport>().ToRunEvery(1).Days().At(5, 59);
            Schedule(() => new SalesReport(applicationContext)).ToRunNow().AndEvery(2).Hours();
        }
    }
}
