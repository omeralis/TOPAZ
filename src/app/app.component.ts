import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './layouts/authentication/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Assignment-TOPAZ';
  isLoggedIn: boolean = false;
  constructor(public authService: AuthService,  public fb: FormBuilder,public router: Router) {}
  ngOnInit(): void {
    this.getIsLoggedIn();
  }

  getIsLoggedIn() {
    this.authService.getIsLoggedIn().subscribe(res => {
      if(res){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });
  }
}