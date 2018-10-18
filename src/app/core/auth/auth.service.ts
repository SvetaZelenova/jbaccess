import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Login, User } from '../../admin/common.interfaces';
import { BehaviorSubject } from 'rxjs';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { CacheService } from './cache.service';

export interface IAuthStatus {
  isAuthenticated: boolean
  user: User
}
export const defaultAuthStatus = {
  isAuthenticated: false,
  user: null
};

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {
  public authStatus = new BehaviorSubject<IAuthStatus>(
    this.getItem('authStatus') || defaultAuthStatus
  );

  private readonly handleError: HandleError;
  private readonly authPath: string;

  constructor(private http: HttpClient,
              private httpErrorHandler: HttpErrorHandler,
              private router: Router) {
    super();
    this.handleError = httpErrorHandler.createHandleError('AuthService');
    this.authPath = environment.API_BASE_PATH + '/security/';
  }
  login(credentials: Login) {
    this.http.post<ApiResponse<User>>(this.authPath + 'login', credentials)
      .pipe(
        map(res => res.payload),
        catchError(this.handleError<User>('login', null))
      )
      .subscribe(user => {
        this.updateAuthStatus(user);
      }, error => {
        if (error.hasOwnProperty('serviceObject') && error.serviceObject.errorMessage === 'Unauthorized') {
          this.authStatus.next(defaultAuthStatus);
          this.router.navigate(['login']);
        }
      });
  }
  restoreSession() {
    this.http.get<ApiResponse<User>>(this.authPath + 'restore-session')
      .pipe(
        map(res => res.payload),
        catchError(this.handleError<User>('restoreSession', null))
      )
      .subscribe( user => {
        this.updateAuthStatus(user);
      },
        error => {
        if (error.hasOwnProperty('serviceObject') && error.serviceObject.errorMessage === 'Unauthorized') {
          this.authStatus.next(defaultAuthStatus);
          this.router.navigate(['login']);
        }
        });
  }
  logout() {
    this.http.get<ApiResponse<any>>(this.authPath + 'logout')
      .pipe(
        catchError(this.handleError<any>('logout', null))
      )
      .subscribe(
        () => {
          this.authStatus.next(defaultAuthStatus);
        },
        null,
        () => { this.router.navigate(['login']); });
  }
  private updateAuthStatus(user: User) {
    if (!user) { return; }
    const newStatus = {
      isAuthenticated: true,
      user: user
    };
    this.authStatus.next(newStatus);
    this.setItem('authStatus', newStatus);
    if (this.router.url === '/login') {
      this.router.navigate(['/']);
    }
  }
}
