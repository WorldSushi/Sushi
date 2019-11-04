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

  getPerformanceChartMC() {
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.data.workgroup.escortManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartMC = data;
      console.log(this.performanceChartMC);
    });
  }

  getPerformanceChartRM() {
    this.http.get<IPerformanceChart>('api/admin/PerformanceChart?managerId=' + this.data.workgroup.regionalManagerId).subscribe((data: IPerformanceChart) => {
      this.performanceChartRM = data;
      console.log(this.performanceChartRM);
    });
  }

  setNumberPlan_DevelopmentCallsMC(numberPlan_DevelopmentCalls: string) {
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.escortManagerId + '&numberPlan_DevelopmentCalls=' + numberPlan_DevelopmentCalls).subscribe();
  }

  setShiftPlan_DevelopmentCallsMC(shiftPlan_DevelopmentCalls: string) {
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.escortManagerId + '&shiftPlan_DevelopmentCalls=' + shiftPlan_DevelopmentCalls).subscribe();
  }

  setBalls_DevelopmentCallsMC(balls_DevelopmentCalls: string) {
    this.http.get('api/admin/PerformanceChart/Edit/Balls_DevelopmentCalls?managerId=' +
      this.data.workgroup.escortManagerId + '&balls_DevelopmentCalls=' + balls_DevelopmentCalls).subscribe();
  }

  setNumberPlan_DevelopmentCallsRM(numberPlan_DevelopmentCalls: string) {
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_DevelopmentCalls=' + numberPlan_DevelopmentCalls).subscribe();
  }

  setShiftPlan_DevelopmentCallsRM(shiftPlan_DevelopmentCalls: string) {
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_DevelopmentCalls=' + shiftPlan_DevelopmentCalls).subscribe();
  }

  setBalls_DevelopmentCallsRM(balls_DevelopmentCalls: string) {
    this.http.get('api/admin/PerformanceChart/Edit/Balls_DevelopmentCalls?managerId=' +
      this.data.workgroup.regionalManagerId + '&balls_DevelopmentCalls=' + balls_DevelopmentCalls).subscribe();
  }

  setShiftPlan_YourShiftsRM(shiftPlan_YourShifts: string) {
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_YourShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_YourShifts=' + shiftPlan_YourShifts).subscribe();
  }

  setNumberPlan_YourShiftsRM(numberPlan_YourShifts: string) {
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_YourShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_YourShifts=' + numberPlan_YourShifts).subscribe();
  }

  setNumberPlan_SubstitutionShiftsRM(numberPlan_SubstitutionShifts: string) {
    this.http.get('api/admin/PerformanceChart/Edit/NumberPlan_SubstitutionShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&numberPlan_SubstitutionShifts=' + numberPlan_SubstitutionShifts).subscribe();
  }

  setShiftPlan_SubstitutionShiftsRM(shiftPlan_SubstitutionShifts: string) {
    this.http.get('api/admin/PerformanceChart/Edit/ShiftPlan_SubstitutionShifts?managerId=' +
      this.data.workgroup.regionalManagerId + '&shiftPlan_SubstitutionShifts=' + shiftPlan_SubstitutionShifts).subscribe();
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
