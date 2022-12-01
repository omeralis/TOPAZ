import { Component, EventEmitter, Output } from '@angular/core';
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
  constructor(public authService: AuthService, public router: Router) { }
  ngOnInit(): void {
    this.getIsLoggedIn();
  }
  getIsLoggedIn() {
    if (this.authService.isLoggedIn) {
      this.isLoggedIn = true;
    }
  }
}
// this.authService.isLoggedIn