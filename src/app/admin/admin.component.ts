import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {LoginService} from "../login/login.service";
import {SecurityService} from "@anatolyua/jbaccess-client-open-api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private securityService: SecurityService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
  }
  logOut() {
    this.securityService.logout()
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['login'])
          this.loginService.setLoggedIn(false)
        },
        err => {
          console.log(err)
        }
      )
  }
}
