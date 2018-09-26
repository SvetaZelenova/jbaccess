import { Component, OnInit } from '@angular/core';

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
