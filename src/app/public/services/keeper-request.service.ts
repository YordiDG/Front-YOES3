import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/base.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeeperRequestService{
  constructor(http:HttpClient) {

  }
}
