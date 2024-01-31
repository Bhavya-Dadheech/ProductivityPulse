import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialog implements OnInit {
  cancelButtonLabel: string = 'No Thanks';
  confirmButtonLabel: string = 'Ok';
  message: string = 'Are you sure?';
  OK: any = 'OK';
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.message = data.message || this.message;
      this.cancelButtonLabel = data.cancelButtonLabel || this.cancelButtonLabel;
      this.confirmButtonLabel =
        data.confirmButtonLabel || this.confirmButtonLabel;
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
