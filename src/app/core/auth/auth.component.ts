import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  logInForm: FormGroup;
  constructor(private fb: FormBuilder, private loginService: AuthService) {}

  ngOnInit() {
    this.logInForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loginService.login(this.logInForm.value);
  }
}
