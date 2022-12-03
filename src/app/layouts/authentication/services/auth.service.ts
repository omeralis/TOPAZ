import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ApiRoutes } from 'src/app/shared/models/router/ApiRoutes';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  constructor(private http: HttpClient, public router: Router) {}

  // get data of login
  login() {
    return this.http.get(this.apiUrl + ApiRoutes.login);
  }
  // get data of login
  AddUser(data: any) {
    return this.http.post(this.apiUrl + ApiRoutes.login, data);
  }
  // logout
  doLogout() {
    this.setIsLoggedIn(false);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
  // Is the token available
  private tokenAvailable(): boolean {
    console.log('get-token', localStorage.getItem('access_token'));
    return !!localStorage.getItem('access_token');
  }
  // set Behavior Subject
  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  // get Behavior Subject
  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }
}
