import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {
  role= 'admin';
  fullname = '';
  birthdate = '';
  phone = '';
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
  goToRegisterCustomer(){
    this.router.navigateByUrl('/register');
  }
  signOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.router.navigate(['']).then();
    console.log("Signed Out");
  }

}
