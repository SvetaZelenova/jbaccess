import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SecurityService} from "@anatolyua/jbaccess-client-open-api";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus: boolean = false;

  constructor(private http: HttpClient,
              private securityService: SecurityService,
              private router: Router) { }

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
  submit(data) {
    this.securityService.login(data)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['person'])
          this.setLoggedIn(true)
        },
        err => {
          console.log(err)
        }
      )

  }
  logout() {
    this.securityService.logout()
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['login'])
          this.setLoggedIn(false)
        },
        err => {
          console.log(err)
        }
      )
  }
}
