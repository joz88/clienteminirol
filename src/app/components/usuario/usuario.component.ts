import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/Usuario';
import { UsuarioServiceService } from 'src/app/services/usaurio/usuario-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public titulo:string = 'Formulario alta usuario';
  public usuario:Usuario;
  private errores : string[];

  constructor(
    private usuarioService:UsuarioServiceService,
    private router:Router
  ) { 
    this.usuario= new Usuario;
  }

  ngOnInit(): void {
  }

  public create():void{
      this.usuarioService.create(this.usuario).subscribe(
        response => {
          this.router.navigate(['/index'])
          Swal.fire('RolMovil',` Usuario dado de alta response del sistema :<br>-> Si Funciono Compi!.. <- <br><br>  `+JSON.stringify(response),'success');
           },
        err => {
          this.errores=err.error.errors as string[];
        }
      );
    }
  
}
