import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EndPoint } from 'src/app/components/EndPoints';
import { Siniestro } from 'src/app/models/siniestro/Siniestro';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SiniestroService {

  constructor(private http:HttpClient, private router:Router) { }



  public envioPush(siniestro:Siniestro):Observable<any>{
    return this.http.post<any>(EndPoint.endpoint+"/push/new",siniestro).pipe(
      catchError(e =>{
        if(EndPoint.noAutorizado(e,this.router)){
          return throwError(e);
        }
        if(e.status =400){
          return throwError(e);
        }
        Swal.fire('Error al crear Siniestro',e.error.mensaje,'error')
        return throwError(e)
      })
    );
  }
}
