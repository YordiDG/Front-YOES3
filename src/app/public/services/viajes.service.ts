import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {Viajes} from "../model/viajes";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ViajesService extends BaseService<Viajes>{

  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/viajes';
  }
}
