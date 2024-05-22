import {Injectable} from '@angular/core';
import {Users} from "../models/Users";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any = {};

  user: Users = {
    id: 0,
    firstName: '',
    lastName: '',
    job: '',
    dni: '',
    salary: 0,
    email: '',
    password: '',
    phoneNumber: '',
    role: ''
  };
  basePath = environment.serverRegister;
  url: string = `/All-Users`;

  private resourcePath(): string {
    return `${this.basePath}${this.url}`;
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  login(email: string, password: string): Observable<Users | null> {
    const url = this.resourcePath();

    return this.http.get<Users[]>(url, this.httpOptions).pipe(
      catchError(this.handleError)
    ).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.userData = user;  // Guardar datos del usuario si es necesario
          this.router.navigate(["home-client"]);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      // Errores del lado del cliente o red
      console.error(`An error occurred ${error.status}, body was: ${error.message}`);
    } else {
      // Errores del lado del servidor
      console.error(`An error occurred ${error.status}, body was: ${error.message}`);
    }
    return throwError('Something happened with request, try again later...');
  }


  createUser(item: any): Observable<Users> {
    return this.http
      .post<Users>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  authenticate(email: string, password: string): Observable<Users> {
    return this.http.get<Users>(`${this.basePath}/new/${encodeURIComponent(email)}/${encodeURIComponent(password)}`);
  }

  getUserByEmailAndPassword(email: string, password: string): Observable<Users> {
    // Define los parámetros de la solicitud HTTP
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get<Users>('https://backend-yoes-final.onrender.com/api/minimarket/usuarios/All-Users', {params});
  }

  saveUserData(data: any) {
    this.userData = data;
  }

  getUserDatas(): Users {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  updateUserProfile(user: Users): Observable<any> {
    const url = `http://localhost:8080/api/minimarket/usuarios/${user.id}/update`;
    return this.http.put(url, user);
  }

}
