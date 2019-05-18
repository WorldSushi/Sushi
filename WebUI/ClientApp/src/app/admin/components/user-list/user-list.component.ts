import { Component, OnInit, Input, Inject } from '@angular/core';
import { Manager } from '../../models/manager.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { IAdminState } from '../../store/states';
import { CreateManager, UpdateManager, DeleteManager } from '../../store/actions/user.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  @Input()
  managers: Manager[];

  displayedColumns: string[] = ["id", "login", "password", "phone", "action"];

  addNewManager() {
    const dialogRef = this.dialog.open(ManagerCreateDialog, {
      minWidth: '620px',
      data: {
        login: '',
        password: '',
        phone: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(new CreateManager({data: result}))

    });
  }

  editManager(manager){
    const dialogRef = this.dialog.open(ManagerCreateDialog, {
      minWidth: '620px',
      data: {
        id: manager.id,
        login: manager.login,
        password: manager.password,
        phone: manager.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(new UpdateManager({data: result}));

    })
  }

  deleteManager(id: number) {
    this.store.dispatch(new DeleteManager({data: id}));
  }

  constructor(private store: Store<IAdminState>,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-manager-dialog',
  templateUrl: 'manager-create-dialog.html',
})
export class ManagerCreateDialog {

  public createManagerForm = new FormGroup({
    id: new FormControl(this.data.id),
    login: new FormControl(this.data.login),
    password: new FormControl(this.data.password),
    phone: new FormControl(this.data.phone)
  })

  save(): void {
    this.dialogRef.close(this.createManagerForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(public dialogRef: MatDialogRef<ManagerCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}
}
