import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-business-trip',
  templateUrl: './business-trip.dialog.html',
})
export class BusinessTripDialog implements OnInit {

  months: object[] = [
    { number: 1, title: 'Январь' },
    { number: 2, title: 'Февраль' },
    { number: 3, title: 'Март' },
    { number: 4, title: 'Апрель' },
    { number: 5, title: 'Май' },
    { number: 6, title: 'Июнь' },
    { number: 7, title: 'Июль' },
    { number: 8, title: 'Август' },
    { number: 9, title: 'Сентябрь' },
    { number: 10, title: 'Октябрь' },
    { number: 11, title: 'Ноябрь' },
    { number: 12, title: 'Декабрь' }
  ]

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<BusinessTripDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
  }

}
