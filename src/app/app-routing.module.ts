import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { SiniestroComponent } from './components/siniestro/siniestro.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'index',component:IndexComponent, canActivate:[AuthGuard],data:{role:['ROLE_ADMIN','ROLE_SISEXT']}},
  {path:'usuario',component:UsuarioComponent,canActivate:[AuthGuard],data:{role:['ROLE_ADMIN','ROLE_SISEXT']}},
  {path:'siniestro',component:SiniestroComponent,canActivate:[AuthGuard],data:{role:['ROLE_ADMIN','ROLE_SISEXT']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
