import {Component, OnInit} from '@angular/core';
import { SecurityService} from "@anatolyua/jbaccess-client-open-api";
import {AuthService} from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor (private securityService:SecurityService,
               private loginService: AuthService) {}
  ngOnInit() {
    this.securityService.restoreSession().subscribe(
      res => {
        if(res.service.successful) {
          console.log("Session restored, user is " + res.payload.username)
          this.loginService.setLoggedIn(true)
        }
      },
      err => {
        console.log(err)
      }
    )

  }
}
