import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/base.service";
import {Mensajeria} from "../models/mensajeria";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService extends BaseService<Mensajeria>{

  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/Mensajes';
  }
  guardarMensaje(mensaje: any): Observable<any> {
    // Corrige el nombre del recurso a '/mensajes'
    return this.http.post(`${this.basePath}/mensajes`, mensaje, this.httpOptions);
  }
}
