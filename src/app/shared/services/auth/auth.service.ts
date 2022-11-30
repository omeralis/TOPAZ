import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../models/auth/user';
import { ApiRoutes } from '../../models/router/ApiRoutes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  // get data of login
  login(){
    return this.http.get(this.apiUrl + ApiRoutes.login);
  }
}
