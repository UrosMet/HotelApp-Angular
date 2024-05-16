import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {catchError} from "rxjs/operators";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService , private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const expiryTime = decodedToken.exp * 1000;
      if (Date.now() > expiryTime) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError('Token expired');
      }

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
