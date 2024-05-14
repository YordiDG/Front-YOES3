import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  correo_electronico: any;
  contrasena: any;
  selectedUserType: 'customer' | 'admin' | null = null;

  formLogin: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder,
              private _userService: UserService) {

    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    console.log("Hello this is login design this was completed by user x")
  }

  goToPhoneNumberForm() {
    this.router.navigate(['/telephone']);
  }

  onLogin() {
    if (this.formLogin.valid) {
      this._userService.login(this.formLogin.get("email")?.value, this.formLogin.get("password")?.value)

    } if(this.selectedUserType == 'customer'){
      this.goToKeeper();
    }
    else if(this.selectedUserType == 'admin')
    {
      this.goToTraveller();
    }else {
      alert("Illegal arguments")
    }
  }

  goToRegister(event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    this.router.navigate(['/register']);
  }

  goToKeeper(){
    this.router.navigateByUrl('/home-client');
  }

  goToTraveller(){
    this.router.navigateByUrl('/home-admin');
  }

  selectUserType(type: 'customer' | 'admin') {
    this.selectedUserType = type;
  }

}
