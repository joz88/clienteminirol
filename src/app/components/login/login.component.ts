import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/login/auth.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/auth/usuario';


@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo:string ='Iniciar session';
  usuario :Usuario;

  constructor(private authService: AuthService,private router:Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.autenticado()){
      Swal.fire('Rol Movil','Ya estas autenticado!!','info');
      this.router.navigate(['/index']);
    }
  }

  login():void{
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error Login','Username o Password vacios!','error')
      return ;
    }
  
    this.authService.login(this.usuario).subscribe(
      response => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
  
        let usuario = this.authService.usuario;
        Swal.fire('Login Exitoso','Estas logeado','success')
        this.router.navigate(['/index']);
      },err =>{
        if(err.status == 400){
          Swal.fire('Error Login','Username o Password incorrectos!','error')
        }
      }
    );
  
  }
  
  
}
