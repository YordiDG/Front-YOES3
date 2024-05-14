import { Injectable } from '@angular/core';
import {Users} from "../models/Users";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class UserService{

  basePath=environment.serverRegister;
  url: string= `/new`

  private resourcePath():string{
    return `${this.basePath}${this.url}`
  }

  constructor(private http:HttpClient,
              private router:Router) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  createUser(item: any): Observable<Users>{
    return this.http
      .post<Users>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getAllUsers(){
    return this.http.get(this.resourcePath())
      .pipe(retry(2), catchError(this.handleError))
  }

  async login(email: string, password: string) {
    const url = `http://localhost:8080/api/minimarket/usuarios/login`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        console.error(`Error en la solicitud: ${response.status}`);
        return null;
      }

      const data = await response.json();
      console.log('Usuario autenticado:', data);
      // Redirigir al usuario a la página principal de la aplicación
      this.router.navigate(["home-client"]);
      return data;
    } catch (error) {
      console.error('Error durante la solicitud:', error);
      return null;
    }
  }




  handleError( error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, try again later...')
  }
}
