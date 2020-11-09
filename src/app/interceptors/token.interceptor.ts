import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/login/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log('mira1');
      let token = this.authService.token;
      //let token ='1eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvX2FkaWNpb25hbCI6IkhvbGEgcXVlIHRhbCE6IGthaXJvcyIsImFqdXN0YWRvciI6MiwidXNlcl9uYW1lIjoia2Fpcm9zIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImFwZWxsaWRvIjoia2Fpcm9zIiwiZXhwIjoxNjA1MTExNzA0LCJub21icmUiOiJrYWlyb3MiLCJhdXRob3JpdGllcyI6WyJST0xFX1NJU0VYVCJdLCJqdGkiOiI2Y2IyMmI0Yi02ZWNhLTQxZmQtYTE0Ny1hNGFiOGNlYjhmZDciLCJlbWFpbCI6ImpyaXZlcmExQGdydXBvbWIubXgiLCJjbGllbnRfaWQiOiJhbmd1bGFyYXBwIn0.Dt9gimUw0oIVL4mpGp9B0JNLPazgwFs2QQpVmqG5eWjJlgH7zIoja29Fp8SbNhHs0GSqYLA5aSDOKC8ngrX0LBlUCu5ZuqI3pbkKaAhnB2R7BtJxbqpIbX1LuSYSiFDHaDZxP6ZzH5AapeXH3OllZc95j5KymkCou4ePxMC0VwxPodnpxC8RWhQeBJseizXb01fO3tCf3vchXvUikIHT3nucfdk30JUXjzax8CUuwIC6kTxEKnKYWGAOKgygjOnaZgJNutJnEz5SBswm2Pfe_D4wob6Wf4Ia2SWl79zTZwIjXClyDGRKwXiEAgBEMR52baX3797o2e8ref8RMQDZjg'
      if(token != null){
        const authReq = req.clone({
          headers: req.headers.set('Authorization','Bearer ' + token)
          .set('Content-Type', 'application/json')
    });
        return next.handle(authReq);
      }
    return next.handle(req);
  }
}
