import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ApiRoutes } from 'src/app/shared/models/router/ApiRoutes';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  isLoginMode = new Subject<boolean>();
  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  constructor(private http: HttpClient, public router: Router) { }

  // get data of login
  login() {
    return this.http.get(this.apiUrl + ApiRoutes.login);
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
      this.setIsLoggedIn(false);
      this.router.navigate(['login']);
    // }
  }
  private tokenAvailable(): boolean {
    console.log('get-token', localStorage.getItem('access_token'));
    return !!localStorage.getItem('access_token');
  }
  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }
}
