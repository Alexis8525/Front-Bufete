import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SesionService } from '../../services/sesion.service';  // Importar el servicio de sesión

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sesionService: SesionService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Verificar si la sesión está activa
    return new Promise((resolve) => {
      this.sesionService.iniciarVerificacion().then((isAuthenticated) => {
        if (isAuthenticated) {
          return resolve(true);  // Si la sesión está activa, permite el acceso
        } else {
          // Si la sesión está expirada, redirigir al login
          this.router.navigate(['/login']);
          return resolve(false);  // Bloquea el acceso
        }
      });
    });
  }
}
