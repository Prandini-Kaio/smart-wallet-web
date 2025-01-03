import {Component, inject} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [
    MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  private snackbar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }
}
