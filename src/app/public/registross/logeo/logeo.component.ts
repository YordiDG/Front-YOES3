import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {MatCardModule} from "@angular/material/card";
import {Router, RouterLink} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-logeo',
  templateUrl: './logeo.component.html',
  styleUrls: ['./logeo.component.css'],
})
export class LogeoComponent  implements OnInit {

  activeTab: string = 'login';
  loginError: boolean = false;
  registerForm: FormGroup;

  registroExitoso: boolean = false;
  loginExitoso: boolean = false;



  formLogin: FormGroup


  constructor(private router: Router,private loginService: LoginService, private formBuilder: FormBuilder,
              private _userService: UserService, private userService:UserService) {

    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm=this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['', Validators.required],
      job:['', Validators.required],
      dni:['', Validators.required],
      salary:['', Validators.required],
      email:['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    console.log("Hello this is login design this was completed by user x")
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.loginError = false; // Reset error message
  }


  onLogin() {
    this._userService.createUser(this.registerForm.value).subscribe(
      (response: any) => {
        if (this.formLogin.valid) {
          this._userService.login(this.formLogin.get("email")?.value, this.formLogin.get("password")?.value)
          this.router.navigate(['home-client'])
          this.loginExitoso = true;


          this.loginService.setCurrentUser(response);
        }
      })
  }

  handleRegistroExitoso() {
    this.registroExitoso = true;

    setTimeout(() => {
      this.registroExitoso = false;
    }, 4000);
  }

  handleLoginExitoso() {
    this.loginExitoso = true;

    setTimeout(() => {
      this.loginExitoso = false;
    }, 4000);
  }

  register() {
    this._userService.createUser(this.registerForm.value).subscribe(
      (response: any) => {
        // Si el usuario se registra correctamente, response contendrá los datos del usuario registrado
        console.log("Registro exitoso:", response);
        this.registroExitoso = true;

        // Guardar los datos del usuario registrado utilizando el servicio de login
        this.loginService.setCurrentUser(response);

        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['sign-in']);
      },
      (error: any) => {
        // Manejar cualquier error que ocurra durante el registro
        console.error("Error durante el registro:", error);
      }
    );
  }


  goToRegister(event: Event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    this.router.navigate(['/register']);
  }

}


