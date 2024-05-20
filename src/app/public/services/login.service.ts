import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private totalCarritoSource = new BehaviorSubject<number>(0);
  totalCarrito$ = this.totalCarritoSource.asObservable();

  constructor() { }

  actualizarTotal(total: number) {
    this.totalCarritoSource.next(total);
  }

}
