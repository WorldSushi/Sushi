import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IPerformanceChart } from '../../shared/models/performance-chart.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.sass']
})
export class PerformanceChartComponent implements OnInit {

  @Input() performanceChartMC: IPerformanceChart;
  @Input() performanceChartRM: IPerformanceChart;

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

  setFormatEC() {
    this.oneTasksEC = this.performanceChartMC.numberPlan_DevelopmentCalls * this.performanceChartMC.shiftPlan_DevelopmentCalls;
    this.oneBallsEC = this.performanceChartMC.balls_DevelopmentCalls * this.oneTasksEC;
    let msgCount = this.data.callEsc.filter(c => c.contactType == 20 || c.contactType == 30).length;
    if (msgCount != 0) {
      let precent = (msgCount / this.data.callEsc.length) * 100;
      let precent10 = this.data.callEsc.length / 0.10;
      if (precent <= precent10) {
        this.tasksEC = this.data.callEsc.length;
      }
      else {
        this.tasksEC = precent;
      }
    }
    else {
      this.tasksEC = this.data.callEsc.length;
    }
    this.ballsEC = this.tasksEC * this.performanceChartMC.balls_DevelopmentCalls;
    if (this.ballsEC != 0) {
      this.fullPrecentEC = this.ballsEC / this.oneBallsEC;
    }
    else {
      this.fullPrecentEC = 0;
    }
  }


  setFormatRM() {
    this.oneTasksRM = this.performanceChartRM.numberPlan_YourShifts * this.performanceChartRM.shiftPlan_YourShifts;
    this.oneTasksRM1 = this.performanceChartRM.numberPlan_SubstitutionShifts * this.performanceChartRM.shiftPlan_SubstitutionShifts;
    this.ballsRM = this.performanceChartRM.numberPlan_DevelopmentCalls * this.performanceChartRM.balls_DevelopmentCalls + this.performanceChartRM.balls_YourShifts * (this.oneTasksRM + this.oneTasksRM1);
    let msgCount = this.data.callReg.filter(c => c.contactType == 20 || c.contactType == 30).length;
    if (msgCount != 0) {
      let precent = (msgCount / this.data.callReg.length) * 100;
      let precent10 = this.data.callReg.length / 0.10;
      if (precent <= precent10) {
        this.tasksRM = this.data.callReg.length;
      }
      else {
        this.tasksRM = precent;
      }
    }
    else {
      this.tasksRM = this.data.callReg.length;
    }
    this.oneBallsRM = (this.performanceChartRM.numberPlan_DevelopmentCalls * this.performanceChartRM.balls_DevelopmentCalls) + (this.performanceChartRM.balls_DevelopmentCalls * this.tasksRM);
    if (this.fullPrecentRM != 0) {
      this.fullPrecentRM = this.fullPrecentRM / this.ballsRM;
    }
    else {
      this.fullPrecentRM = 0;
    }
  }


  getPerformanceChartMC() {
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.data.workgroup.escortManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartMC = data;
      this.setFormatEC();
      console.log(this.performanceChartMC);
    });
  }

  getPerformanceChartRM() {
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.data.workgroup.regionalManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartRM = data;
      this.setFormatRM();
      console.log(this.performanceChartRM);
    });
  }

  setNumberPlan_DevelopmentCallsMC(numberPlan_DevelopmentCalls: number) {
    this.performanceChartMC.numberPlan_DevelopmentCalls = numberPlan_DevelopmentCalls;
    this.setFormatEC();
    this.oneTasksEC = this.performanceChartMC.numberPlan_DevelopmentCalls * this.performanceChartMC.shiftPlan_DevelopmentCalls;
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.escortManagerId + '&numberPlan_DevelopmentCalls=' + numberPlan_DevelopmentCalls).subscribe();
  }

  setShiftPlan_DevelopmentCallsMC(shiftPlan_DevelopmentCalls: number) {
    this.performanceChartMC.shiftPlan_DevelopmentCalls = shiftPlan_DevelopmentCalls;
    this.setFormatEC();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_DevelopmentCalls?managerId=' +
    this.data.workgroup.escortManagerId + '&shiftPlan_DevelopmentCalls=' + shiftPlan_DevelopmentCalls).subscribe();
  }

  setBalls_DevelopmentCallsMC(balls_DevelopmentCalls: number) {
    this.performanceChartMC.balls_DevelopmentCalls = balls_DevelopmentCalls;
    this.setFormatEC();
    this.http.get('api/admin/PerformanceChart/Edit/Balls_DevelopmentCalls?managerId=' +
      this.data.workgroup.escortManagerId + '&balls_DevelopmentCalls=' + balls_DevelopmentCalls).subscribe();
  }

  setNumberPlan_DevelopmentCallsRM(numberPlan_DevelopmentCalls: number) {
    this.performanceChartRM.numberPlan_DevelopmentCalls = numberPlan_DevelopmentCalls;
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_DevelopmentCalls=' + numberPlan_DevelopmentCalls).subscribe();
  }

  setShiftPlan_DevelopmentCallsRM(shiftPlan_DevelopmentCalls: number) {
    this.performanceChartRM.shiftPlan_DevelopmentCalls = shiftPlan_DevelopmentCalls;
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_DevelopmentCalls=' + shiftPlan_DevelopmentCalls).subscribe();
  }

  setBalls_DevelopmentCallsRM(balls_DevelopmentCalls: number) {
    this.performanceChartRM.balls_DevelopmentCalls = balls_DevelopmentCalls;
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/Balls_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&balls_DevelopmentCalls=' + balls_DevelopmentCalls).subscribe();
  }

  setShiftPlan_YourShiftsRM(shiftPlan_YourShifts: number) {
    this.performanceChartRM.shiftPlan_YourShifts = shiftPlan_YourShifts;
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_YourShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_YourShifts=' + shiftPlan_YourShifts).subscribe();
  }

  setNumberPlan_YourShiftsRM(numberPlan_YourShifts: number) {
    this.performanceChartRM.numberPlan_YourShifts = numberPlan_YourShifts;
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_YourShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_YourShifts=' + numberPlan_YourShifts).subscribe();
  }

  setNumberPlan_SubstitutionShiftsRM(numberPlan_SubstitutionShifts: number) {
    this.performanceChartRM.numberPlan_SubstitutionShifts = numberPlan_SubstitutionShifts;
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_SubstitutionShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_SubstitutionShifts=' + numberPlan_SubstitutionShifts).subscribe();
  }

  setShiftPlan_SubstitutionShiftsRM(shiftPlan_SubstitutionShifts: number) {
    this.performanceChartRM.shiftPlan_SubstitutionShifts = shiftPlan_SubstitutionShifts;
    this.setFormatRM();
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_SubstitutionShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_SubstitutionShifts=' + shiftPlan_SubstitutionShifts).subscribe();
  }

  setBalls_YourShiftsShiftsRM(balls_YourShifts: number) {
    this.performanceChartRM.balls_YourShifts = balls_YourShifts;
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
