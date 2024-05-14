import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken.Role === 'ADMIN') {
        return true;
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
}
