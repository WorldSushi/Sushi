import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IWeekPlan } from '../../shared/models/week-plan.model';

@Component({
  selector: 'app-week-plans',
  templateUrl: './week-plans-dialog.component.html',
  styleUrls: ['./week-plans-dialog.component.sass']
})
export class WeekPlansDialogComponent implements OnInit {

  displayedColumns: string[] = ['Number', 'MSplanned', 'RMplanned', 'MSfact', 'RMfact'];

  selectedWeek: IWeekPlan = {
    id: 0,
    MSplanned: '',
    MSfact: '',
    RMfact: '',
    RMplanned: '',
    clientId: 0
  }

  numberOfWeek = "Не выбрана"

  selectWeek(weekPlan, numberOfWeek){
    this.numberOfWeek = numberOfWeek + 1;
    this.selectedWeek = weekPlan;
  }

  save(){
    this.dialogRef.close(this.data.weekPlans);
  }

  close(){
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<WeekPlansDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
