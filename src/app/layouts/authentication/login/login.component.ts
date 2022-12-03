import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //
  LoginForm: FormGroup;
  DataResponse: any[] = [];
  userData: any;
  submitted = false;
  isLoading = false;

  constructor(private authService: AuthService, public fb: FormBuilder, public router: Router) {
    this.LoginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser() {
    // Send data request
    this.authService.login().subscribe(
      (res: any) => {
        this.DataResponse = res;
        console.log('Data :', this.DataResponse);
      },
      (err) => {
      }
    );
  }

  login() {
    this.submitted = true;
    this.isLoading = false;
    if (this.LoginForm.invalid) {
      return;
    }
    this.userData = this.DataResponse.find((user: any) => {
      return user.username === this.LoginForm.controls['username']?.value
    });
    console.log("userData", this.userData);
    // Compare user info
    if (this.userData) {
      console.log('password', this.userData);
      console.log('data control', (this.LoginForm.value.password))
      if (this.userData.password !== this.LoginForm.value.password) {
        // Invalid password
        console.log("Invalid password");
      } else {
        console.log('login');
        const sign = require('jwt-encode');
        const secret = 'secret';
        const jwt = sign(this.userData, secret);
        localStorage.setItem('access_token', jwt);
        console.log(jwt);
        this.authService.setIsLoggedIn(true);
        console.log("",this.authService.getIsLoggedIn().value);
        
        this.router.navigate(['/case/list']);
      }
    } else {
      // Username not found
      console.log("username not found");
    }

  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get loginForm(): any {
    return this.LoginForm.controls;
  }
}
