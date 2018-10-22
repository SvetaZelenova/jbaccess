import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private loginService: AuthService,
    private navService: SideNavService
  ) {}

  ngOnInit() {}
  logOut() {
    this.loginService.logout();
  }
  toggleNavBar() {
    this.navService.toggle();
  }
}
