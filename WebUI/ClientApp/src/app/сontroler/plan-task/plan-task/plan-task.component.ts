import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IWorkgroupPlans } from '../../../admin/workgroups/shared/models/workgroup-plans.model';
import { IWorkgroup } from '../../../admin/workgroups/shared/models/workgroup.model';
import { IWeekPlan } from '../../../manager-rm/clients/shared/models/week-plan.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { IClient } from '../../../manager-any/clients/shared/models/client.model';
import { IClientData } from '../Model/client-data.model';

@Component({
  selector: 'app-plan-task',
  templateUrl: './plan-task.component.html',
  styleUrls: ['./plan-task.component.sass']
})
export class PlanTaskComponent implements OnInit {

  //@Input() workgroupPlans: IWorkgroupPlans[];
  //@Input() weekPlans: IWeekPlan[];
  //@Input() workgroups: IWorkgroup[];
  @Input() clientsData: IClientData[] = [];

  displayedColumns: string[] = ['status', 'title', 'legalEntity',  'comentCon', 'comentCli']

  getworkgroupPlans() {
    this.http.get<IClientData[]>('api/conroler/ClientAccept/WeekPlan').subscribe((data: IClientData[]) => {
      this.clientsData = data
    });
    console.log(this.clientsData);
  }

  www() {
    console.log(123);
  }

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getworkgroupPlans();
  }

}
