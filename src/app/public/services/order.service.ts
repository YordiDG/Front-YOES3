import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://minimarket-yoes.zeabur.app/api/orders';

  constructor(private http: HttpClient) {}

  saveOrder(order: any): Observable<any> {
    const orderData = {
      montoPrestamo: order.montoPrestamo,
      fecha: order.fecha
    };

    return this.http.post(`${this.apiUrl}/save`, orderData);
  }


  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
