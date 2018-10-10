import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  logInForm: FormGroup;
  constructor(private fb: FormBuilder,
              private loginService: AuthService,
              private router: Router) { }

  ngOnInit() {

    if (this.loginService.isLoggedIn) {
      this.router.navigate(['person'])
    }
    this.logInForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loginService.login(this.logInForm.value)
  }

}
