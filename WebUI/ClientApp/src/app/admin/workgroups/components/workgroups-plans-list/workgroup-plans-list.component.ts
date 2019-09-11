import { Component, OnInit, Input } from '@angular/core';
import { IWorkgroupPlans } from '../../shared/models/workgroup-plans.model';
import { find } from 'rxjs/operators';
import { IWeekPlan } from 'src/app/manager-rm/clients/shared/models/week-plan.model';

@Component({
  selector: 'app-workgroup-plans-list',
  templateUrl: './workgroup-plans-list.component.html',
  styleUrls: ['./workgroup-plans-list.component.sass']
})
export class WorkgroupPlansListComponent implements OnInit {

  @Input() workgroupPlans: IWorkgroupPlans[];
  @Input() weekPlans: IWeekPlan[];

  selectedWeek: number = Math.ceil(new Date().getDate() / 7);
  dateCollections: string[] = [];
  dateCollection: string;
  numberMonthe: number = 0;
  numberYear: number = 0;

  getWeekPlan(numberOfWeek: number, weekPlans: IWeekPlan[] = []){
    return weekPlans.find(item => item.weekNumber == numberOfWeek);
  }

  getCurrentPlan(weekPlans: IWeekPlan[] = [], numberOfWeek: number){
    if(weekPlans.find(item => item.weekNumber == numberOfWeek))
      return weekPlans.find(item => item.weekNumber == numberOfWeek).plan;
    else
      return '';
  }

  getCurrentFact(weekPlans: IWeekPlan[] = [], numberOfWeek: number){

    if(weekPlans.find(item => item.weekNumber == numberOfWeek))
      return weekPlans.find(item => item.weekNumber == numberOfWeek).fact;
    else
      return '';
  }

  sortWeekPlan(month: number, year: number) {
    this.workgroupPlans.forEach(item => {
      item.escortManagerPlans = [];
      item.regionalManagerPlans = [];
    })
    let weekPlans = this.weekPlans.filter(w => new Date(w.dateTime.split('.')[2] + "/" + w.dateTime.split('.')[1] + "/" + w.dateTime.split('.')[0]).getMonth() == month
      && new Date(w.dateTime.split('.')[2] + "/" + w.dateTime.split('.')[1] + "/" + w.dateTime.split('.')[0]).getFullYear() == year);
    for (let i = 0; i < weekPlans.length; i++) {
      if (weekPlans[i].managerType == 10 && this.workgroupPlans.find(plan => plan.clientId == weekPlans[i].clientId && weekPlans[i].managerType == 10) != null) {
        this.workgroupPlans.find(plan => plan.clientId == weekPlans[i].clientId  && weekPlans[i].managerType == 10).escortManagerPlans.push(weekPlans[i]);
      }
      else if (weekPlans[i].managerType == 20 && this.workgroupPlans.find(plan => plan.clientId == weekPlans[i].clientId && weekPlans[i].managerType == 20) != null) {
        this.workgroupPlans.find(plan => plan.clientId == weekPlans[i].clientId && weekPlans[i].managerType == 20).regionalManagerPlans.push(weekPlans[i]);
      }
    }
  }

  initDateArchiv() {
    if (this.dateCollections.length == 0) {
      this.dateCollections = [];
      let firstDate = new Date();
      for (let i = 0; i < this.weekPlans.length; i++) {
        let tmpDate = this.weekPlans[i].dateTime.split(".");
        if (firstDate > new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0])) {
          firstDate = new Date(tmpDate[2] + '/' + tmpDate[1] + '/' + tmpDate[0]);
        }
      }
      for (let i = firstDate.getFullYear(); i <= new Date().getFullYear(); i++) {
        for (let j = firstDate.getMonth(); j <= new Date().getMonth(); j++) {
          let date = new Date(i + "/0" + (j + 1));
          this.dateCollections.unshift(new Date(i + "/0" + (j + 1)).toLocaleDateString().substring(3, date.toLocaleDateString().length));
        }
      }
      this.dateCollection = this.dateCollections[0];
    }
  }

  toFormatDate(dateSelect) {
    let partDate = dateSelect.split('.');
    let date = new Date(partDate[1] + "/" + partDate[0]);
    this.numberMonthe = date.getMonth();
    this.numberYear = date.getFullYear();
    this.sortWeekPlan(date.getMonth(), date.getFullYear());
  }

  constructor() {
    
  }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    this.workgroupPlans.forEach(item => {
      item.selectedESWeek = this.selectedWeek
      item.selectedRMWeek = this.selectedWeek
    })
    this.initDateArchiv();
    this.sortWeekPlan(new Date().getMonth(), new Date().getFullYear());
    console.log(this.dateCollections);
  }

}
