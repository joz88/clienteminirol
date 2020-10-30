import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Siniestro } from 'src/app/models/siniestro/Siniestro';
import { SiniestroService } from 'src/app/services/siniestro/siniestro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-siniestro',
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.css']
})
export class SiniestroComponent implements OnInit {

  public siniestro:Siniestro;
  private errores : string[];

  constructor(
    private siniestroService:SiniestroService,
    private router:Router
  ) { 
    this.siniestro=new Siniestro;
  }

  ngOnInit(): void {
  }



  public enviarPush():void{
    this.siniestroService.envioPush(this.siniestro).subscribe(
      response => {
        this.router.navigate(['/index'])
        Swal.fire('RolMovil',` Siniestro y push enviados response del sistema :<br>-> Si Funciono Compi!.. <- <br><br>  `+JSON.stringify(response),'success');
         },
      err => {
        this.errores=err.error.errors as string[];
      }
    );
  }


}
