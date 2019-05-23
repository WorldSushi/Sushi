import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-weekplan',
  templateUrl: './weekplan.dialog.html',
})
export class WeekPlanDialog implements OnInit {

  weeks: any[] = [
    { id: 0, clientId: this.data.clientId, weekNumber: 1, fact: '', plan: '' },
    { id: 0, clientId: this.data.clientId, weekNumber: 2, fact: '', plan: '' },
    { id: 0, clientId: this.data.clientId, weekNumber: 3, fact: '', plan: '' },
    { id: 0, clientId: this.data.clientId, weekNumber: 4, fact: '', plan: '' },
    { id: 0, clientId: this.data.clientId, weekNumber: 5, fact: '', plan: '' },
  ]

  displayedColumns = ['weekNumber', 'fact', 'plan'];
  editedWeeks = [];

  save(): void {
    this.dialogRef.close({ weeks: this.weeks, editedWeeks: this.editedWeeks });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  weekUpdate(id){
    if(id != 0){
      this.editedWeeks.push(id);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<WeekPlanDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.weeks = this.weeks.map(item => this.data.weekPlans.find(obj => obj.weekNumber == item.weekNumber) || item)
    }

  ngOnInit() {
  }

}