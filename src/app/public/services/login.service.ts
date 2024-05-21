import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Users} from "../models/Users";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private totalCarritoSource = new BehaviorSubject<number>(0);
  totalCarrito$ = this.totalCarritoSource.asObservable();


  private currentUser = new BehaviorSubject<Users | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor() { }

  actualizarTotal(total: number) {
    this.totalCarritoSource.next(total);
  }


  setCurrentUser(user: Users) {
    this.currentUser.next(user);
  }

  getCurrentUser(): Users | null {
    return this.currentUser.getValue();
  }

}
