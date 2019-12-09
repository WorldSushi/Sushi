import { Component, OnInit, Inject, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IWeekPlan } from '../../shared/models/week-plan.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientResumeWeek } from '../../shared/models/client-resume-week.model';


@Component({
  selector: 'app-week-plans',
  templateUrl: './week-plans-dialog.component.html',
  styleUrls: ['./week-plans-dialog.component.sass']
})
export class WeekPlansDialogComponent implements OnInit {

  @Output() addFact: EventEmitter<IWeekPlan> = new EventEmitter<IWeekPlan>();

  clientResumeWeeks: ClientResumeWeek;

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


    toMonthDate = new Date().toLocaleDateString().substring(3, new Date().toLocaleDateString().length);


    curentDate: string = ""

  selectedMSWeek: IWeekPlan = {
    id: 0,
    managerType: 0,
    plan: '',
    fact: '',
    weekNumber: 0,
    clientId: 0,
    dateTime: ""
  }

  selectedRMWeek: IWeekPlan = {
    id: 0,
    managerType: 0,
    plan: '',
    fact: '',
    weekNumber: 0,
    clientId: 0,
    dateTime: ""
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
      this.initCurrentDate(this.numberOfWeek);
    }

    initCurrentDate(numberWeek: number) {
        if (numberWeek == 1) {
            this.curentDate = this.firstdayOneWeek + " - " + this.lastdayOneWeek;
        }
        else if (numberWeek == 2) {
            this.curentDate = this.firstdayTwoWeek + " - " + this.lastdayTwoWeek;
        }
        else if (numberWeek == 3) {
            this.curentDate = this.firstdaythreeWeek + " - " + this.lastdaythreeWeek;
        }
        else if (numberWeek == 4) {
            this.curentDate = this.firstdayFourWeek + " - " + this.lastdayFourWeek;
        }
        else if (numberWeek == 5) {
            this.curentDate = this.firstdayFiveWeek + " - " + this.lastdayFiveWeek;
        }
    }

  setWeeks(numberOfWeek: number) {
        debugger
    if(this.data.weekPlans.find(item => item.managerType == 10 && item.weekNumber == numberOfWeek))
      this.selectedMSWeek = this.data.weekPlans.find(item => item.managerType == 10 && item.weekNumber == numberOfWeek);
    else
      this.selectedMSWeek = {
        id: 0, clientId: this.data.id, managerType: 10, plan: '', fact: '', weekNumber: numberOfWeek, dateTime: ""};
    
    if(this.data.weekPlans.find(item => item.managerType == 20 && item.weekNumber == numberOfWeek))
      this.selectedRMWeek = this.data.weekPlans.find(item => item.managerType == 20 && item.weekNumber == numberOfWeek);
    else
      this.selectedRMWeek = {
        id: 0, clientId: this.data.id, managerType: 20, plan: '', fact: '', weekNumber: numberOfWeek, dateTime: ""}

      this.numberOfWeek = numberOfWeek;
      this.initCurrentDate(this.numberOfWeek);
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

    addFactToWeekPlan(weekPlan: IWeekPlan) {
        debugger
    this.addFact.emit(weekPlan);
  }

  addResume(element) {
    this.http.get('api/manager/Client/AddResume?idClient=' + this.data.id + '&strResume=' + element.target.value).subscribe();
  }

  getResume() {
    this.http.get<ClientResumeWeek>('api/manager/Client/Resume?idClient=' + this.data.id).subscribe((data: ClientResumeWeek) =>
    {
      this.clientResumeWeeks = data;
      this.cdr.detectChanges();
    });
  }

  save(){
    this.dialogRef.close(this.data.weekPlans);
  }

  close(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.getResume();
    if(this.data.weekPlans.find(item => item.managerType == 10 && this.numberOfWeek == item.weekNumber))
      this.selectedMSWeek = this.data.weekPlans.find(item => item.managerType == 10 && item.weekNumber == this.numberOfWeek)
    else
      this.selectedMSWeek = { id: 0, clientId: this.data.id, managerType: 10, plan: '', fact: '', weekNumber: this.numberOfWeek, dateTime: ""};
    if(this.data.weekPlans.find(item => item.managerType == 20 && this.numberOfWeek == item.weekNumber))
      this.selectedRMWeek = this.data.weekPlans.find(item => item.managerType == 20 && item.weekNumber == this.numberOfWeek)
    else
      this.selectedRMWeek = { id: 0, clientId: this.data.id, managerType: 20, plan: '', fact: '', weekNumber: this.numberOfWeek, dateTime: ""}
    this.initDate();
  }

  constructor(public dialogRef: MatDialogRef<WeekPlansDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
  }

}
