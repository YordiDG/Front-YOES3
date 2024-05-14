import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  registerForm: FormGroup;

  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private router:Router) {

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
  }

  register() {

    this.userService.createUser(this.registerForm.value).subscribe(
      (val:any)=>{
        this.router.navigate(['login'])
        console.log("Registro exitoso")

      })

  }

}
