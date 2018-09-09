import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loginService.loginUser(this.logInForm.value)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['person'])
          this.loginService.setLoggedIn(true)
        },
        err => console.log(err)
      )
  }
}
