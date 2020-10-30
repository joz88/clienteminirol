import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { AuthService } from '../services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authService.autenticado()){
        this.router.navigate(['/login']);
        return false;
      }
      let role = next.data['role'] as string[];
      for(var r in role){
      if(this.authService.hasRole(role[r])){
        return true;
      }
    }

      Swal.fire('Error de acceso','Usted no tiene acceso a esta parte del sitio','info')
      this.router.navigate(['/index']);
    return false;
  }

}
