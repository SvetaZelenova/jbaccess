import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInStatus: boolean = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    if(localStorage) {
      localStorage.setItem('loggedInStatus', JSON.stringify(this.loggedInStatus));
    }
  }
  get isLoggedIn() {
    if(localStorage) {
      this.loggedInStatus = JSON.parse(localStorage.getItem('loggedInStatus'));
    }
    return this.loggedInStatus
  }
}
