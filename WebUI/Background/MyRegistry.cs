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
            //Schedule(() => new DebitoryReport(applicationContext)).ToRunNow().AndEvery(2).Hours();
            //Schedule(() => new SalleReport(applicationContext)).ToRunNow().AndEvery(2).Hours();
            //Schedule(() => new Nomenclature(applicationContext)).ToRunNow().AndEvery(2).Hours();
            //Schedule(() => new OprosReport(applicationContext)).ToRunNow().AndEvery(2).Hours();
        }
    }
}
