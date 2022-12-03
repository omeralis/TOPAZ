import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  DataResponse: any[] = [];
  userData: any;
  submitted = false;
  isLoading = false;

  constructor(private authService: AuthService, public fb: FormBuilder, public router: Router,
    private toastr: ToastrService) {
    this.LoginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  // Send data request
  getDataUser() {
    this.authService.login().subscribe(
      (res: any) => {
        this.DataResponse = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  login() {
    this.submitted = true;
    this.isLoading = true;
    if (this.LoginForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.userData = this.DataResponse.find((user: any) => {
      return user.username === this.LoginForm.controls['username']?.value
    });
    // Compare user info
    if (this.userData) {
      if (this.userData.password !== this.LoginForm.value.password) {
        // Invalid password
        this.isLoading = false;
        this.toastr.error('Invalid password');
        console.log("Invalid password");
      } else {
        this.isLoading = false;
        console.log('login');
        const sign = require('jwt-encode');
        const secret = 'secret';
        const jwt = sign(this.userData, secret);
        localStorage.setItem('access_token', jwt);
        this.authService.setIsLoggedIn(true);
        this.router.navigate(['/case/list']);
      }
    } else {
      // Username not found
      this.isLoading = false;
      this.toastr.error('username not found');
      console.log("username not found");
    }

  }
  // validation 
  get loginForm(): any {
    return this.LoginForm.controls;
  }
}
