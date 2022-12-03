import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, 
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/layouts/authentication/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('this.authService.isLoggedIn =>', this.authService.getIsLoggedIn().value)
    if (!this.authService.getIsLoggedIn().value) {
      // window.alert("");
      this.router.navigate(['login'])

      console.log('test')
  }
    return true;
  }
}