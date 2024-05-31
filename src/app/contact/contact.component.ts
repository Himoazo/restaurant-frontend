import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatButton, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(private contactService: ContactService, private _snackBar: MatSnackBar){}

  contactForm = new FormGroup({
    customername: new FormControl("", [Validators.required, Validators.maxLength(30)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    message: new FormControl("", [Validators.required, Validators.maxLength(1000)])
    });

    //Send contact us message
    formError: string = "";
    sendMessage():void{
      const message = this.contactForm.value;
    
      this.contactService.sendMessage(message as Contact).subscribe({
        next: ()=>{
          console.log(message);
          this.formError = "";
          this.openSnackBar("Vi har tagit emot ditt meddelande");
        },
        error: (error)=>{
          this.formError = "Någt har gått fel, meddelandet är inte sktickat"
        }
      });
    }

    //Snackbar
    openSnackBar(message: string) {
      this._snackBar.open(message, "X", {
        duration: 5000
      });
    }
}
