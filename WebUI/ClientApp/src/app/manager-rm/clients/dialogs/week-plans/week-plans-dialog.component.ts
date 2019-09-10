import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IWeekPlan } from '../../shared/models/week-plan.model';


@Component({
  selector: 'app-week-plans',
  templateUrl: './week-plans-dialog.component.html',
  styleUrls: ['./week-plans-dialog.component.sass']
})
export class WeekPlansDialogComponent implements OnInit {

  @Output() addFact: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();

  displayedColumns: string[] = ['Number', 'MSplanned', 'RMplanned', 'MSfact', 'RMfact'];


  firstdayOneWeek: any;
  lastdayOneWeek: any;

  firstdayTwoWeek: any;
  lastdayTwoWeek: any;

  firstdaythreeWeek: any;
  lastdaythreeWeek: any;

  firstdayFourWeek: any;
  lastdayFourWeek: any;

  firstdayFiveWeek: any;
  lastdayFiveWeek: any;

  selectedMSWeek: IWeekPlan = {
    id: 0,
    managerType: 0,
    plan: '',
    fact: '',
    weekNumber: 0,
    clientId: 0
  }

  selectedRMWeek: IWeekPlan = {
    id: 0,
    managerType: 0,
    plan: '',
    fact: '',
    weekNumber: 0,
    clientId: 0
  }

  numberOfWeek: any = Math.ceil(new Date().getDate() / 7);
  weekPlans: IWeekPlan[];


  initDate() {
    let day = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
    let tmpDate = new Date(new Date().getFullYear(), new Date().getMonth(), (7 - (7 - day)) + 2);
    this.firstdayOneWeek = tmpDate.toLocaleDateString();
    tmpDate.setDate(tmpDate.getDate() + 4);
    this.lastdayOneWeek = tmpDate.toLocaleDateString();

    tmpDate.setDate(tmpDate.getDate() + 3);
    this.firstdayTwoWeek = tmpDate.toLocaleDateString();
    tmpDate.setDate(tmpDate.getDate() + 4);
    this.lastdayTwoWeek = tmpDate.toLocaleDateString();

    tmpDate.setDate(tmpDate.getDate() + 3);
    this.firstdaythreeWeek = tmpDate.toLocaleDateString();
    tmpDate.setDate(tmpDate.getDate() + 4);
    this.lastdaythreeWeek = tmpDate.toLocaleDateString();

    tmpDate.setDate(tmpDate.getDate() + 3);
    this.firstdayFourWeek = tmpDate.toLocaleDateString();
    tmpDate.setDate(tmpDate.getDate() + 4);
    this.lastdayFourWeek = tmpDate.toLocaleDateString();

    tmpDate.setDate(tmpDate.getDate() + 3);
    this.firstdayFiveWeek = tmpDate.toLocaleDateString();
    tmpDate.setDate(tmpDate.getDate() + 4);
    this.lastdayFiveWeek = tmpDate.toLocaleDateString();
  }

  setWeeks(numberOfWeek: number){

    if(this.data.weekPlans.find(item => item.managerType == 10 && item.weekNumber == numberOfWeek))
      this.selectedMSWeek = this.data.weekPlans.find(item => item.managerType == 10 && item.weekNumber == numberOfWeek);
    else
      this.selectedMSWeek = { id: 0, clientId: this.data.id, managerType: 10, plan: '', fact: '', weekNumber: numberOfWeek};
    
    if(this.data.weekPlans.find(item => item.managerType == 20 && item.weekNumber == numberOfWeek))
      this.selectedRMWeek = this.data.weekPlans.find(item => item.managerType == 20 && item.weekNumber == numberOfWeek);
    else
      this.selectedRMWeek = { id: 0, clientId: this.data.id, managerType: 20, plan: '', fact: '', weekNumber: numberOfWeek}

    this.numberOfWeek = numberOfWeek;
  }

  addNewWeekPlan(addingWeekPlan: IWeekPlan){
    if(addingWeekPlan.plan != '')
      this.data.weekPlans = [...this.data.weekPlans, addingWeekPlan];
  }

  getMSWeekPlans(weekPlans: IWeekPlan[]){
    let result = [];
    weekPlans = this.data.weekPlans.filter(item => item.managerType == 10);

    for(let i = 1; i <= 5; i++){
      if(weekPlans.find(item => item.weekNumber == i))
        result.push(this.data.weekPlans.find(item => item.weekNumber == i))
      else
        result.push({ id: 0, plan: '', clientId: this.data.id, managerType: 10, fact: '', weekNumber: i  })
    }

    return result
  }

  getRMWeekPlans(weekPlans: IWeekPlan[]){
    let result = [];
    weekPlans = this.data.weekPlans.filter(item => item.managerType == 20);

    for(let i = 1; i <= 5; i++){
      if(weekPlans.find(item => item.weekNumber == i))
        result.push(this.data.weekPlans.find(item => item.weekNumber == i))
      else
        result.push({ id: 0, plan: '', clientId: this.data.id, managerType: 20, fact: '', weekNumber: i  })
    }

    return result
  }

  addFactToWeekPlan(weekPlan: IWeekPlan){
    this.addFact.emit(weekPlan);
  }

  save(){
    this.dialogRef.close(this.data.weekPlans);
  }

  close(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.weekPlans.find(item => item.managerType == 10 && this.numberOfWeek == item.weekNumber))
      this.selectedMSWeek = this.data.weekPlans.find(item => item.managerType == 10 && item.weekNumber == this.numberOfWeek)
    else
      this.selectedMSWeek = { id: 0, clientId: this.data.id, managerType: 10, plan: '', fact: '', weekNumber: this.numberOfWeek};
    if(this.data.weekPlans.find(item => item.managerType == 20 && this.numberOfWeek == item.weekNumber))
      this.selectedRMWeek = this.data.weekPlans.find(item => item.managerType == 20 && item.weekNumber == this.numberOfWeek)
    else
      this.selectedRMWeek = { id: 0, clientId: this.data.id, managerType: 20, plan: '', fact: '', weekNumber: this.numberOfWeek }
    this.initDate();
  }

  constructor(public dialogRef: MatDialogRef<WeekPlansDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

}
