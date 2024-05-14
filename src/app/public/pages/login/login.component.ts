import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo_electronico: any;
  contrasena: any;
  selectedUserType: 'login' | 'client' | 'admin' = 'login';

  constructor(private router: Router){}
  goToRegister(){
    this.router.navigateByUrl('/register-keeper');
  }

  goToKeeper(){
    this.router.navigateByUrl('/home-keeper');
  }

  goToTraveller(){
    this.router.navigateByUrl('/home-traveller');
  }
  goToLogin(){
    this.router.navigateByUrl('/sign-in');
  }

  selectUserType(type: 'client' | 'admin') {
    this.selectedUserType = type;
  }

  login(){
    if(this.selectedUserType == 'client'){
      this.goToKeeper();
    }
    else if(this.selectedUserType == 'admin')
    {
      this.goToTraveller();
    }
  }

}
