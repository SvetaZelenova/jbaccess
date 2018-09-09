import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuth} from "./auth";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInStatus: boolean = false;

  private logInUrl = 'http://127.0.0.1:8000/security/login'
  private logoutUrl = 'http://127.0.0.1:8000/security/logout'

  constructor(private http: HttpClient) { }

  loginUser(user): Observable<IAuth[]> {
    return this.http.post<IAuth[]>(this.logInUrl, user)
  }
  logoutUser() {
    return this.http.get(this.logoutUrl)
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
}
