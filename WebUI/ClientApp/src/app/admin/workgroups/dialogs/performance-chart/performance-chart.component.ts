import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPerformanceChart } from '../../shared/models/performance-chart.model';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.sass']
})
export class PerformanceChartComponent implements OnInit {

    @Input() performanceChartMC: IPerformanceChart = {
        balls_DevelopmentCalls: 0,
        balls_SubstitutionShifts: 0,
        balls_YourShifts: 0,
        managerId: 0,
        numberPlan_DevelopmentCalls: 0,
        numberPlan_SubstitutionShifts: 0,
        numberPlan_YourShifts: 0,
        shiftPlan_DevelopmentCalls: 0,
        shiftPlan_SubstitutionShifts: 0,
        shiftPlan_YourShifts: 0
    };
    @Input() performanceChartRM: IPerformanceChart = {
        balls_DevelopmentCalls: 0,
        balls_SubstitutionShifts: 0,
        balls_YourShifts: 0,
        managerId: 0,
        numberPlan_DevelopmentCalls: 0,
        numberPlan_SubstitutionShifts: 0,
        numberPlan_YourShifts: 0,
        shiftPlan_DevelopmentCalls: 0,
        shiftPlan_SubstitutionShifts: 0,
        shiftPlan_YourShifts: 0
    };

  oneTasksEC = 0;
  tasksEC = 0;
  oneBallsEC = 0;
  ballsEC = 0;
  discrepancyEC = 0;
  fullPrecentEC = 0;

  oneTasksRM = 0;
  oneTasksRM1 = 0;
  tasksRM = 0;
  oneBallsRM = 0;
  ballsRM = 0;
  discrepancyRM = 0;
    fullPrecentRM = 0;
    sumFactTrip: number = 0;

    setFormatEC() {
        if (!this.performanceChartMC.numberPlan_DevelopmentCalls) {
            this.performanceChartMC.numberPlan_DevelopmentCalls = 0;
        }
        this.oneTasksEC = this.performanceChartMC.numberPlan_DevelopmentCalls * this.performanceChartMC.shiftPlan_DevelopmentCalls;
        this.oneBallsEC = this.performanceChartMC.balls_DevelopmentCalls * this.oneTasksEC;
        let msgCount = this.data.callEsc.filter(c => c.contactType == 20 || c.contactType == 30).length;
        debugger
        if (msgCount != 0) {
            let precent = 0;
            if (this.data.callEsc.filter(c => c.contactType == 40 && c.managerType == 10).length > 0) {
                let countMessgeAndCall = 0;
                let countCall = this.data.callEsc.filter(c => c.contactType == 40 && c.managerType == 10).length;
                countMessgeAndCall = msgCount + countCall;
                precent = (100 * msgCount) / countMessgeAndCall;
                if (precent > 10) {
                    this.tasksEC = countCall + (countMessgeAndCall * 0.10);
                }
                else {
                    this.tasksEC = countMessgeAndCall;
                }
            }
            else {
                this.tasksEC = 0;
            }
        }
        else {
            this.tasksEC = this.data.callEsc.filter(c => c.contactType == 40).length;
        }
        this.ballsEC = this.performanceChartMC.balls_DevelopmentCalls * this.tasksEC;
        if (this.ballsEC != 0) {
            debugger
            this.fullPrecentEC = (this.ballsEC / this.oneBallsEC) * 100;
        }
        else {
            this.fullPrecentEC = 0;
        }
    }


    setFormatRM() {
        if (!this.performanceChartRM.numberPlan_DevelopmentCalls) {
            this.performanceChartRM.numberPlan_DevelopmentCalls = 0;
        }
        this.oneTasksRM = this.performanceChartRM.numberPlan_YourShifts * this.performanceChartRM.shiftPlan_YourShifts;
        this.oneTasksRM1 = this.performanceChartRM.numberPlan_SubstitutionShifts * this.performanceChartRM.shiftPlan_SubstitutionShifts;
        this.ballsRM = (this.performanceChartRM.numberPlan_DevelopmentCalls * this.performanceChartRM.balls_DevelopmentCalls) + (this.performanceChartRM.balls_YourShifts * this.oneTasksRM1);
        let msgCount = this.data.callReg.filter(c => c.contactType == 20 || c.contactType == 30).length;
        if (msgCount != 0) {
            let precent = 0;
            if (this.data.callReg.filter(c => c.contactType == 40 && c.managerType == 20).length > 0) {
                let countMessgeAndCall = 0;
                let countCall = this.data.callReg.filter(c => c.contactType == 40).length;
                countMessgeAndCall = msgCount + countCall;
                precent = (100 * msgCount) / countMessgeAndCall;
                if (precent > 10) {
                    this.tasksRM = countCall + (countMessgeAndCall * 0.10);
                }
                else {
                    this.tasksRM = countMessgeAndCall;
                }
            }
            else {
                this.tasksRM = 0;
            }
        }
        else {
            this.tasksRM = this.data.callReg.filter(c => c.contactType == 40 && c.managerType == 20).length;
        }
        this.oneBallsRM = (this.performanceChartRM.balls_YourShifts * this.tasksRM) + this.sumFactTrip;
        if (this.ballsRM != 0) {
            this.fullPrecentRM = (this.oneBallsRM / this.ballsRM) * 100;
        }
        else {
            this.fullPrecentRM = 0;
        }
    }

    getTripFactRM() {
        this.http.get<number>('api/manager/BusinessTripPlan/TripFac?managerId=' + this.performanceChartRM.managerId).subscribe((data: number) => {
            this.sumFactTrip = data;
            this.setFormatRM();
        });
    }


    getPerformanceChartMC() {
        this.performanceChartMC.numberPlan_DevelopmentCalls = 0;
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.data.workgroup.escortManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartMC = data;
      this.setFormatEC();
    });
  }

    getPerformanceChartRM() {
        this.performanceChartRM.numberPlan_DevelopmentCalls = 0;
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.data.workgroup.regionalManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartRM = data;
        this.getTripFactRM();
    });
  }

    setNumberPlan_DevelopmentCallsMC(numberPlan_DevelopmentCalls: number) {
        this.performanceChartMC.numberPlan_DevelopmentCalls = Number(numberPlan_DevelopmentCalls);
    this.setFormatEC();
    this.oneTasksEC = this.performanceChartMC.numberPlan_DevelopmentCalls * this.performanceChartMC.shiftPlan_DevelopmentCalls;
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.escortManagerId + '&numberPlan_DevelopmentCalls=' + numberPlan_DevelopmentCalls).subscribe();
  }

  setShiftPlan_DevelopmentCallsMC(shiftPlan_DevelopmentCalls: number) {
      this.performanceChartMC.shiftPlan_DevelopmentCalls = Number(shiftPlan_DevelopmentCalls);
    this.setFormatEC();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_DevelopmentCalls?managerId=' +
    this.data.workgroup.escortManagerId + '&shiftPlan_DevelopmentCalls=' + shiftPlan_DevelopmentCalls).subscribe();
  }

  setBalls_DevelopmentCallsMC(balls_DevelopmentCalls: number) {
      this.performanceChartMC.balls_DevelopmentCalls = Number(balls_DevelopmentCalls);
    this.setFormatEC();
    this.http.get('api/admin/PerformanceChart/Edit/Balls_DevelopmentCalls?managerId=' +
      this.data.workgroup.escortManagerId + '&balls_DevelopmentCalls=' + balls_DevelopmentCalls).subscribe();
  }

    setNumberPlan_DevelopmentCallsRM(numberPlan_DevelopmentCalls: number) {
        this.performanceChartRM.numberPlan_DevelopmentCalls = Number(numberPlan_DevelopmentCalls);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_DevelopmentCalls=' + numberPlan_DevelopmentCalls).subscribe();
  }

  setShiftPlan_DevelopmentCallsRM(shiftPlan_DevelopmentCalls: number) {
      this.performanceChartRM.shiftPlan_DevelopmentCalls = Number(shiftPlan_DevelopmentCalls);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_DevelopmentCalls=' + shiftPlan_DevelopmentCalls).subscribe();
  }

  setBalls_DevelopmentCallsRM(balls_DevelopmentCalls: number) {
      this.performanceChartRM.balls_DevelopmentCalls = Number(balls_DevelopmentCalls);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/Balls_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&balls_DevelopmentCalls=' + balls_DevelopmentCalls).subscribe();
  }

  setShiftPlan_YourShiftsRM(shiftPlan_YourShifts: number) {
      this.performanceChartRM.shiftPlan_YourShifts = Number(shiftPlan_YourShifts);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_YourShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_YourShifts=' + shiftPlan_YourShifts).subscribe();
  }

  setNumberPlan_YourShiftsRM(numberPlan_YourShifts: number) {
      this.performanceChartRM.numberPlan_YourShifts = Number(numberPlan_YourShifts);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_YourShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_YourShifts=' + numberPlan_YourShifts).subscribe();
  }

  setNumberPlan_SubstitutionShiftsRM(numberPlan_SubstitutionShifts: number) {
      this.performanceChartRM.numberPlan_SubstitutionShifts = Number(numberPlan_SubstitutionShifts);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_SubstitutionShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_SubstitutionShifts=' + numberPlan_SubstitutionShifts).subscribe();
  }

  setShiftPlan_SubstitutionShiftsRM(shiftPlan_SubstitutionShifts: number) {
      this.performanceChartRM.shiftPlan_SubstitutionShifts = Number(shiftPlan_SubstitutionShifts);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_SubstitutionShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_SubstitutionShifts=' + shiftPlan_SubstitutionShifts).subscribe();
  }

  setBalls_YourShiftsShiftsRM(balls_YourShifts: number) {
      this.performanceChartRM.balls_YourShifts = Number(balls_YourShifts);
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/Balls_YourShifts?managerId=' +
    this.data.workgroup.regionalManagerId + '&balls_YourShifts=' + balls_YourShifts).subscribe();
  }
  constructor(private http: HttpClient,
              public dialogRef: MatDialogRef<PerformanceChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.getPerformanceChartRM();
    this.getPerformanceChartMC();
  }

  ngOnInit() {
  }
}
