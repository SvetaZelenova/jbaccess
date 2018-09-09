import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuth} from "./auth";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInStatus: boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  private logInUrl = 'http://127.0.0.1:8000/security/login'

  constructor(private http: HttpClient) { }

  loginUser(user): Observable<IAuth[]> {
    return this.http.post<IAuth[]>(this.logInUrl, user)
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
    localStorage.setItem('loggedIn', 'true')
  }
  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString())
  }
}
