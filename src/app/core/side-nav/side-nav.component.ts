import {Component, HostBinding, OnInit} from '@angular/core';
import {SideNavService} from '../side-nav.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @HostBinding('class') menuClass = 'hide-menu';
  @HostBinding('class.toggle-nav')
  showNav = false;
  constructor(private navService: SideNavService,
              private loginService: AuthService) { }

  ngOnInit() {
    this.open()
  }
  open() {
    this.navService.change.subscribe(showNav => {
      this.showNav = !this.showNav
    })
  }
  logOut() {
    this.loginService.logout()
  }
  menuToggle() {
    this.menuClass = this.menuClass === 'show-menu' ? 'hide-menu' : 'show-menu';
  }
}
