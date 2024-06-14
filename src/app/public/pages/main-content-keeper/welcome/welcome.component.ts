import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(public dialogRef: MatDialogRef<WelcomeComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
