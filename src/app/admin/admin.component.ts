import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  items: MenuItem[]
  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.items = [{
      label: 'Menu',
      items: [
        {label: 'Personnel', icon: 'fa fa-plus', routerLink: ['/person']},
        {label: 'Places', icon: 'fa fa-download', routerLink: ['/places']},
        {label: 'Doors', icon: 'fa fa-download'}
      ]
    }]
  }
  logOut() {
    this.loginService.logoutUser()
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
