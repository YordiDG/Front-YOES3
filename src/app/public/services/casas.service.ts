import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/base.service";
import {Casas} from "../model/casas";

@Injectable({
  providedIn: 'root'
})
export class CasasService extends BaseService<Casas>{

  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/houses';
  }
}
