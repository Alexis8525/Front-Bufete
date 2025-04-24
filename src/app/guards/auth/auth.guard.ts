import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';  // Asegúrate de importar el servicio adecuado

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Si el usuario no está logueado y no estamos en la página de login, redirige al login
    if (this.usuarioService.isLoggedIn()) {
      return true;  // Si está logueado, permite el acceso
    } else {
      // Redirige al login si no está logueado
      if (state.url !== '/login') {
        this.router.navigate(['/login']);
      }
      return false;  // Bloquea el acceso si no está logueado
    }
  }
}
