import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAuth} from "./auth";
import {Observable} from "rxjs/index";
import {environment} from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInStatus: boolean = false;

  constructor(private http: HttpClient) { }

  loginUser(user): Observable<IAuth[]> {
    return this.http.post<IAuth[]>(`${apiUrl}/security/login`, user, { withCredentials: true})
  }
  logoutUser() {
    return this.http.get(`${apiUrl}/security/logout`, {withCredentials:true})
  }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }
  get isLoggedIn() {
    return this.loggedInStatus
  }
}
