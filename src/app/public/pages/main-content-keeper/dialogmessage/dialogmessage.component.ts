import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogmessage',
  templateUrl: './dialogmessage.component.html',
  styleUrls: ['./dialogmessage.component.css'],

})
export class DialogmessageComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogmessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}


