import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-amount-business-trip',
  templateUrl: './amount-business-trip.dialog.html',
  styleUrls: ['amount-business-trip.dialog.sass']
})
export class AmountBusinessTripDialog implements OnInit {

  tripCompleted: object[] = [
    { number: 0, title: '0' },
    { number: 10, title: '0.3' },
    { number: 20, title: '0.5' },   
    { number: 30, title: '1' },
  ]

  save(): void {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public dialogRef: MatDialogRef<AmountBusinessTripDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(this.data)
    }

  ngOnInit() {
  }
}