import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/login/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError(e => {

        if(e.status == 401){
          console.log("401");
          if(this.authService.autenticado()){
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if(e.status == 403){
          console.log("403");
          Swal.fire('Error de acceso','Usted no tiene acceso a esta parte del sitio','info')
          this.router.navigate(['/dash']);
        }
        return throwError(e);
      })
    );
  }
}
