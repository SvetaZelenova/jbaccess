import { Component, HostBinding, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../../admin/common.interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @HostBinding('class')
  menuClass = 'hide-menu';
  currentUser: User;
  constructor(
    private navService: SideNavService,
    private loginService: AuthService
  ) {}

  ngOnInit() {
    this.loginService.authStatus
      .pipe(map(s => s.user))
      .subscribe(user => (this.currentUser = user));
  }
  logOut() {
    this.loginService.logout();
  }
  menuToggle() {
    this.menuClass = this.menuClass === 'show-menu' ? 'hide-menu' : 'show-menu';
  }
}
