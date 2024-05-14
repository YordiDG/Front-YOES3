import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient,HttpErrorResponse,HttpHeaders} from "@angular/common/http";
import {catchError,Observable,retry,throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '/all-product';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(protected http: HttpClient) { }

  private resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error(`An error ocurred ${error.error.message}`);
    } else{
      console.log(`Backend returned core ${error.status}, body was ${error.error}`);
    }
    return throwError(()=>new Error(`Something happend with request, please try again later.`));
  }

  getAll(): Observable<T> {
    return this.http.get<T>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
