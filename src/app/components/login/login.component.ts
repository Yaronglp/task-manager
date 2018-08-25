import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputGroup = new FormGroup({
    userNameControl: new FormControl('', [
      Validators.required,
    ]),
    passwordControl: new FormControl('', [
      Validators.required,
    ])
  });

  wrongCredentialsMsg = 'Wrong username or password';
  showErrorMsg: boolean;

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit() {
    this.loginService.logout();
    this.showErrorMsg = false;
  }

  onLoginClick() {
    if (this.inputGroup.valid) {
      const credential = {
        username: this.inputGroup.controls['userNameControl'].value,
        password: this.inputGroup.controls['passwordControl'].value
      };

      this.loginService.login(credential)
        .then(res => {
          if (res === true) {
            this.router.navigate(['./dashboard']);
          } else {
            this.showErrorMsg = true;
          }
        });
    }
  }
}
