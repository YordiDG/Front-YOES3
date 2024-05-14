import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent {
  fullname = '';
  birthdate = '';
  phone: string = "";
  email = '';
  password = '';
  repeat_password = '';

  constructor(private router: Router) {}

  onPhoneInput(event: any) {
    this.phone = this.phone.replace(/\D/g, '');

  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToRegisterTraveller(){
    this.router.navigateByUrl('/register-admin');
  }
  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.router.navigate(['']).then();
    console.log("Signed Out");
  }


}
