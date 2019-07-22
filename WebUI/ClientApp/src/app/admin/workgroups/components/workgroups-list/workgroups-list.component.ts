import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkgroup } from '../../shared/models/workgroup.model';
import { MatDialog } from '@angular/material';
import { DetailWorkgroupDialogComponent } from '../../dialogs/detail-workgroup-dialog/detail-workgroup-dialog.component';
import { IClient } from 'src/app/manager-rm/clients/shared/models/client.model';


@Component({
  selector: 'app-workgroups-list',
  templateUrl: './workgroups-list.component.html',
  styleUrls: ['./workgroups-list.component.sass']
})
export class WorkgroupsListComponent implements OnInit {

  @Input() workgroups: IWorkgroup[];
  @Input() freeClients: IClient[];

  @Output() clientAddedToWorkgroup  = new EventEmitter();

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
