import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { EndPoint } from 'src/app/components/EndPoints';
import { Usuario } from 'src/app/models/usuario/Usuario';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
 

  constructor(private http:HttpClient, private router:Router) { }



  public create(usuario:Usuario):Observable<any>{
    return this.http.post<any>(EndPoint.endpoint+"/interfaz/rol/usuario",usuario).pipe(
      catchError(e =>{
        if(EndPoint.noAutorizado(e,this.router)){
          return throwError(e);
        }
        if(e.status =400){
          return throwError(e);
        }
        Swal.fire('Error al crear Usaurio',e.error.mensaje,'error')
        return throwError(e)
      })
    );
  }
}
