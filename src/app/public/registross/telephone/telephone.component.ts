import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.css']
})
export class TelephoneComponent implements OnInit {

  registerForm: FormGroup; // Define registerForm como tipo FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      job: ['', Validators.required],
      dni: ['', Validators.required],
      salary: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required], // Puedes añadir más validadores si lo deseas
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  redirectToContinueWithPhone(): void {
    this.router.navigate(['/telephone']);
  }

  register(): void {
    if (this.registerForm.valid) {
      console.log('Formulario de registro válido:', this.registerForm.value);
    } else {
      console.log('Formulario de registro inválido');
    }
  }

}
