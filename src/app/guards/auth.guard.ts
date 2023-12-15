import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthenticationService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['home']);
    }
    return true;
  }
}
