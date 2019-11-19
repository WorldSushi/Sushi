using Data;
using Data.Entities.Calls;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace WebUI.ApiControllers.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    public class PerformanceChartController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public PerformanceChartController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get(string managerId)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if(performanceChart == null)
            {
                performanceChart = new PerformanceChart()
                {
                    Balls_DevelopmentCalls = 0,
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = 0
                };
            }
            return Ok(performanceChart);
        }

        [HttpGet]
        [Route("Edit/NumberPlan_DevelopmentCalls")]
        public void SetNumberPlan_DevelopmentCalls(string managerId, string numberPlan_DevelopmentCalls)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if(performanceChart != null)
            {
                performanceChart.NumberPlan_DevelopmentCalls = Convert.ToDouble(numberPlan_DevelopmentCalls.Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    Balls_DevelopmentCalls = 0,
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = Convert.ToDouble(numberPlan_DevelopmentCalls.Replace('.', ',')),
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = 0
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("Edit/ShiftPlan_DevelopmentCalls")]
        public void ShiftPlan_DevelopmentCalls(string managerId, string shiftPlan_DevelopmentCalls)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if (performanceChart != null)
            {
                performanceChart.ShiftPlan_DevelopmentCalls = Convert.ToDouble(shiftPlan_DevelopmentCalls.Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    Balls_DevelopmentCalls = 0,
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = Convert.ToDouble(shiftPlan_DevelopmentCalls.Replace('.', ',')),
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = 0
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("Edit/Balls_DevelopmentCalls")]
        public void Balls_DevelopmentCalls(string managerId, string balls_DevelopmentCalls)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if (performanceChart != null)
            {
                performanceChart.Balls_DevelopmentCalls = Convert.ToDouble(balls_DevelopmentCalls.Replace('.', ',').Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_DevelopmentCalls = Convert.ToDouble(balls_DevelopmentCalls.Replace('.', ',').Replace('.', ',')),
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = 0
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("Edit/ShiftPlan_YourShifts")]
        public void ShiftPlan_YourShifts(string managerId, string shiftPlan_YourShifts)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if (performanceChart != null)
            {
                performanceChart.ShiftPlan_YourShifts = Convert.ToDouble(shiftPlan_YourShifts.Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_DevelopmentCalls = 0,
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = Convert.ToDouble(shiftPlan_YourShifts.Replace('.', ','))
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("Edit/NumberPlan_YourShifts")]
        public void NumberPlan_YourShifts(string managerId, string numberPlan_YourShifts)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if (performanceChart != null)
            {
                performanceChart.NumberPlan_YourShifts = Convert.ToDouble(numberPlan_YourShifts.Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_DevelopmentCalls = 0,
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = Convert.ToDouble(numberPlan_YourShifts.Replace('.', ',')),
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = 0
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("Edit/NumberPlan_SubstitutionShifts")]
        public void NumberPlan_SubstitutionShifts(string managerId, string numberPlan_SubstitutionShifts)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if (performanceChart != null)
            {
                performanceChart.NumberPlan_SubstitutionShifts = Convert.ToDouble(numberPlan_SubstitutionShifts.Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_DevelopmentCalls = 0,
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = Convert.ToDouble(numberPlan_SubstitutionShifts.Replace('.', ',')),
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = 0
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("Edit/ShiftPlan_SubstitutionShifts")]
        public void ShiftPlan_SubstitutionShifts(string managerId, string shiftPlan_SubstitutionShifts)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if (performanceChart != null)
            {
                performanceChart.ShiftPlan_SubstitutionShifts = Convert.ToDouble(shiftPlan_SubstitutionShifts.Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_DevelopmentCalls = 0,
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = 0,
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = Convert.ToDouble(shiftPlan_SubstitutionShifts.Replace('.', ',')),
                    ShiftPlan_YourShifts = 0
                });
            }
            _context.SaveChanges();
        }

        [HttpGet]
        [Route("Edit/Balls_YourShifts")]
        public void Balls_YourShifts(string managerId, string balls_YourShifts)
        {
            PerformanceChart performanceChart = _context.Set<PerformanceChart>().FirstOrDefault(p => p.ManagerId.ToString() == managerId);
            if (performanceChart != null)
            {
                performanceChart.Balls_YourShifts = Convert.ToDouble(balls_YourShifts.Replace('.', ','));
            }
            else
            {
                _context.Set<PerformanceChart>().Add(new PerformanceChart()
                {
                    ManagerId = Convert.ToInt32(managerId),
                    Balls_DevelopmentCalls = 0,
                    Balls_SubstitutionShifts = 0,
                    Balls_YourShifts = Convert.ToInt32(balls_YourShifts.Replace('.', ',')),
                    NumberPlan_DevelopmentCalls = 0,
                    NumberPlan_SubstitutionShifts = 0,
                    NumberPlan_YourShifts = 0,
                    ShiftPlan_DevelopmentCalls = 0,
                    ShiftPlan_SubstitutionShifts = 0,
                    ShiftPlan_YourShifts = 0
                });
            }
            _context.SaveChanges();
        }
    }
}