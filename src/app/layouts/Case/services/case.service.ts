import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from 'src/app/shared/models/router/ApiRoutes';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // get data of case
  getList() {
    return this.http.get(this.apiUrl + ApiRoutes.case.all);
  }
  addList(data: any) {
    return this.http.post(this.apiUrl + ApiRoutes.case.all, data);
  }
}
