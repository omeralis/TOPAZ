import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, RouterStateSnapshot,
    UrlTree, CanActivate, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/layouts/authentication/services/auth.service';
@Injectable({
    providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        public router: Router
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            console.log('isLoggedIn' , this.authService.isLoggedIn)
        if (this.authService.getIsLoggedIn().value) {
            this.router.navigate(['case/list']);
            console.log('test')
        }
        return true;
    }
}