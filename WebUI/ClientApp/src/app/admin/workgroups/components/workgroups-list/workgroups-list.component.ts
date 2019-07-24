import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { MatDialog } from '@angular/material';
import { DetailWorkgroupDialogComponent } from '../../dialogs/detail-workgroup-dialog/detail-workgroup-dialog.component';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { CreateWorkgroupDialogComponent } from '../../dialogs/create-workgroup-dialog/create-workgroup-dialog.component';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';
import { ICallsDate } from 'src/app/manager-rm/clients/shared/models/calls-date.model';


@Component({
  selector: 'app-workgroups-list',
  templateUrl: './workgroups-list.component.html',
  styleUrls: ['./workgroups-list.component.sass']
})
export class WorkgroupsListComponent implements OnInit {

  @Input() workgroups: IWorkgroup[];
  @Input() freeClients: IClient[];
  @Input() clientContacts: ICallsDate[];

  @Input() freeManagers: IManager[];

  @Output() clientAddedToWorkgroup = new EventEmitter();
  @Output() workgroupCreated = new EventEmitter();
  @Output() workgroupChanged = new EventEmitter();

  openWorkgroupDetail(workgroup: IWorkgroup){
    const dialogRef = this.dialog.open(DetailWorkgroupDialogComponent, {
      width: '90%',
      height: '80%',
      data: {
        workgroup: workgroup,
        freeClients: this.freeClients,
        freeManagers: this.freeManagers
      }
    })

    const sub1 = dialogRef.componentInstance.clientAdded.subscribe((data: any) => {
      
      this.clientAddedToWorkgroup.emit(data);
    });

    const sub2 = dialogRef.componentInstance.workgroupChanged.subscribe((data: any) => {
       
      this.workgroupChanged.emit(data);
    });
  }

  openWorkgroupCreate(){
    const dialogRef = this.dialog.open(CreateWorkgroupDialogComponent, {
      width: '725px',
      data: this.freeManagers
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.workgroupCreated.emit(res);
      }
    })
  }

  getAmountContactsToday(managerId: number){
    const today = new Date().toLocaleDateString();

    return this.clientContacts.filter(item => item.date == today && item.managerId == managerId).length;
  }

  ngOnChanges(changes): void {

  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
