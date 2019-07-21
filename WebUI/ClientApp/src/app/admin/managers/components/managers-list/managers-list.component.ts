import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IManager } from '../../shared/models/manager.model';
import { CreateManagerDialogComponent } from '../../dialogs/create-manager-dialog/create-manager-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-managers-list',
  templateUrl: './managers-list.component.html',
  styleUrls: ['./managers-list.component.sass']
})
export class ManagersListComponent implements OnInit {

  @Input() managers: IManager[];

  @Output() managerCreated: EventEmitter<IManager> = new EventEmitter<IManager>();

  displayedColumns: string[] = ['login', 'password', 'phone'];

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
