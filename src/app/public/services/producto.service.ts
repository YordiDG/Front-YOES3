import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {Casas} from "../models/casas";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService<Casas>{

  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/all-product';
  }

  /**********************************************************/

  public cartUpdated$: Subject<boolean> = new Subject();

  getCategory(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/minimarket/categorias/all-category');
  }

  createCategory(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/minimarket/categorias/new-category', obj);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/product/all-product');
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/v1/product/all-product');
  }

  getProductById(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/v1/product/${productId}`);
  }

  // Modifica el método para que envíe una solicitud PUT
  updateProduct(id: number, obj: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/v1/product/${id}/update`, obj);
  }

  deleteProduct(id: any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/v1/product/${id}/delete`);
  }

  /*  addToCart(obj: any): Observable<any> {
    return this.http.post<any>(Constant.API_END_POINT + Constant.METHODS.ADD_TO_CART, obj);
  }

  getCartDataByCustId(custId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.GET_CART_BY_CUST + custId);
  }


  openSaleBySaleId(saleId: number): Observable<any[]> {
    return this.http.get<any[]>(Constant.API_END_POINT + Constant.METHODS.OPEN_SALE_BY_SALE_ID + saleId);
  }*/
}
