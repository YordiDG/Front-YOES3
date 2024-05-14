import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/base.service";
import {MensajeriaTraveller} from "../models/mensajeriaTraveller";

@Injectable({
  providedIn: 'root'
})
export class MensajeriaTravellerService extends BaseService<MensajeriaTraveller>{

  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/MensajesTraveller';
  }
}
