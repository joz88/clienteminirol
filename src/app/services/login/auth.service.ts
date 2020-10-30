import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/auth/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndPoint } from 'src/app/components/EndPoints';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _usuario: Usuario;
  private _token:string;
  private urlLogin:string=EndPoint.endpoint+'/oauth/token';

  public get usuario():Usuario{
    if(this._usuario != null ){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token():string{
    if(this._token != null ){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  constructor(private http: HttpClient) { }


  public login(usaurio:Usuario):Observable<any>{
    const credenciales = btoa('angularapp'+':'+'12345');

    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic '+ credenciales});

      let params = new URLSearchParams();
      params.set('grant_type','password');
      params.set('username',usaurio.username);
      params.set('password',usaurio.password);

    return this.http.post<any>(this.urlLogin,params.toString(),{headers:httpHeaders});
  }

  public guardarUsuario(accessToken:string):void{
    let payload= this.obtenerDatosToken(accessToken);

    this._usuario= new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }
  
  public obtenerDatosToken(accessToken:string):any{
    if(accessToken != null ){
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  public guardarToken(accessToken:string):void{
    this._token=accessToken;
    sessionStorage.setItem('token',accessToken);

  }

  public autenticado():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  public hasRole(role:string):boolean{
      
    if(this.usuario.roles.includes(role)){
      return true;
    }
  return false;
}

public logout():void{
  this._token=null;
  this._usuario=null;
  sessionStorage.clear();
}
}
