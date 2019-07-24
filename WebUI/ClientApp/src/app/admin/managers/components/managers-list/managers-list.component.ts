import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IManager } from '../../shared/models/manager.model';
import { CreateManagerDialogComponent } from '../../dialogs/create-manager-dialog/create-manager-dialog.component';
import { MatDialog } from '@angular/material';
import { DetailManagerDialogComponent } from '../../dialogs/detail-manager-dialog/detail-manager-dialog.component';
import { EditManagerDialogComponent } from '../../dialogs/edit-manager-dialog/edit-manager-dialog.component';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.sass']
})
export class ManagersListComponent implements OnInit {

  @Input() managers: IManager[];

  @Output() managerCreated: EventEmitter<IManager> = new EventEmitter<IManager>();
  @Output() managerUpdated: EventEmitter<IManager> = new EventEmitter<IManager>();

  displayedColumns: string[] = ['login', 'password', 'workgroupTitle', 'phone', 'action'];

  openCreateManagerForm() {
    const dialogRef = this.dialog.open(CreateManagerDialogComponent, {
      width: '725px'
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.managerCreated.emit(res);
      }
    })
  }
  

  openManagerDetail(manager: IManager) {
    const dialogRef = this.dialog.open(DetailManagerDialogComponent, {
      width: '725px',
      data: manager
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.managerUpdated.emit(res);
      }
    })
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
