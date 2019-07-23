import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { MatDialog } from '@angular/material';
import { DetailWorkgroupDialogComponent } from '../../dialogs/detail-workgroup-dialog/detail-workgroup-dialog.component';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';
import { CreateWorkgroupDialogComponent } from '../../dialogs/create-workgroup-dialog/create-workgroup-dialog.component';
import { IManager } from 'src/app/admin/managers/shared/models/manager.model';


@Component({
  selector: 'app-workgroups-list',
  templateUrl: './workgroups-list.component.html',
  styleUrls: ['./workgroups-list.component.sass']
})
export class WorkgroupsListComponent implements OnInit {

  @Input() workgroups: IWorkgroup[];
  @Input() freeClients: IClient[];

  @Input() freeManagers: IManager[];

  @Output() clientAddedToWorkgroup = new EventEmitter();
  @Output() workgroupCreated = new EventEmitter();

  openWorkgroupDetail(workgroup: IWorkgroup){
    const dialogRef = this.dialog.open(DetailWorkgroupDialogComponent, {
      width: '90%',
      height: '80%',
      data: {
        workgroup: workgroup,
        freeClients: this.freeClients
      }
    })

    const sub = dialogRef.componentInstance.clientAdded.subscribe((data: any) => {
      
      this.clientAddedToWorkgroup.emit(data);
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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
