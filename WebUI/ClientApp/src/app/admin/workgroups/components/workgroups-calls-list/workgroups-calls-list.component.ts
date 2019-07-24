import { Component, OnInit, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';
import { IWorkgroupCalls } from '../../shared/models/workgroup-calls.model';


@Component({
  selector: 'app-workgroups-calls-list',
  templateUrl: './workgroups-calls-list.component.html',
  styleUrls: ['./workgroups-calls-list.component.sass']
})
export class WorkgroupsCallsListComponent implements OnInit {
  
  @Input() workgroupsCalls: IWorkgroupCalls;

  days: number[] = this.getDaysInMonth();

  getDaysInMonth(){
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const result = [];

    for(let i = 0; i < daysInMonth; i++){
      result.push(i + 1);
    }

    return result;
  }

  getClientContactType(day, clientActions = [], clientId){
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const date = new Date(year, month, day).toLocaleDateString();
    let result: any[] = clientActions.filter(item => item.date == date);
    
    result = this.getUnique(result, 'managerType')

    if(!result.find(item => item.managerType == 10))
      result = [{ clientId: clientId, contactType: 0, date: date, id: 0, managerId: 0, managerType: 10 }, ...result]

    if(!result.find(item => item.managerType == 20))
      result = [...result, { clientId: clientId, contactType: 0, date: date, id: 0, managerId: 0, managerType: 20 },]
    

    return result
  }

  getSumActions(managerType, clientActions){
    return clientActions.filter(item => item.managerType == managerType).length;
  }

  getActionColor(contactType) {
    
    if(contactType == 0)
      return '#e5e5e5';
    else if (contactType == 10)
      return '#9CBFF3'
    else if (contactType == 20)
      return '#B0ECDD'
    else if (contactType == 30)
      return '#FDE488'
  }

  getUnique(arr, comp) {

    const unique = arr
         .map(e => e[comp])
  
       // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
  
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
  
     return unique;
  }

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
