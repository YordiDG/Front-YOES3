import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private totalCarritoSource = new BehaviorSubject<number>(0);
  totalCarrito$ = this.totalCarritoSource.asObservable();

  constructor() { }

  actualizarTotal(total: number) {
    this.totalCarritoSource.next(total);
  }
}
