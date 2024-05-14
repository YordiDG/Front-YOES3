import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {keepers} from "../models/keepers";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class KeepersService extends BaseService<keepers>{
  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/keepers';
  }
}
