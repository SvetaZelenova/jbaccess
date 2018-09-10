import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuth} from "./auth";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInStatus: boolean = false;

  constructor(private http: HttpClient) { }

  loginUser(user): Observable<IAuth[]> {
    return this.http.post<IAuth[]>('/security/login', user, { withCredentials: true})
  }
  logoutUser() {
    return this.http.get('/security/logout')
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
}
