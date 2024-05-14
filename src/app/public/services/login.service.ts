import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  searchBox: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }


  registerCustomer(obj: any) {
    return this.http.post('http://localhost:8080/api/minimarket/usuarios/new', obj);
  }


}
