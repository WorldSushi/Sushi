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

  selectedWeek: number = Math.ceil(new Date().getDate() / 7);

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

  constructor() {
    
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes): void {
    this.workgroupPlans.forEach(item => {
      item.selectedESWeek = this.selectedWeek
      item.selectedRMWeek = this.selectedWeek
    })

    console.log(this.workgroupPlans);
  }

}
