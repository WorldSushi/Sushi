@Component({
    selector: 'app-manager-client-dialog',
    templateUrl: 'manager-client-dialog.html',
  })
  export class ManagerClientDialog {
  
    private createClientForm = new FormGroup({
      id: new FormControl(this.data.id),
      title: new FormControl(this.data.title),
      phone: new FormControl(this.data.phone)
    })
  
    save(): void {
      this.dialogRef.close(this.createClientForm.value);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    constructor(public dialogRef: MatDialogRef<ClientCreateDialog>,
      @Inject(MAT_DIALOG_DATA) public data) {}
  }