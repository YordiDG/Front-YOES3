import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private apiUrl = 'https://minimarket-yoes.zeabur.app/api/order-details';

  constructor(private http: HttpClient) {}

  saveOrderDetail(orderDetail: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, orderDetail);
  }


  /**getAllOrders(): Observable<any> {
   return this.http.get(`${this.apiUrl}`);
   }

   getOrderById(id: number): Observable<any> {
   return this.http.get(`${this.apiUrl}/${id}`);
   }*/
}
