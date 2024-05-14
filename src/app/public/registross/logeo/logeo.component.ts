import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatCardModule} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-logeo',
  templateUrl: './logeo.component.html',
  styleUrls: ['./logeo.component.css'],
})
export class LogeoComponent  implements OnInit {

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

    } else {
      alert("Illegal arguments")
    }
  }

  goToRegister(event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    this.router.navigate(['/registro']);
  }

}
