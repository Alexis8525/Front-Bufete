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
    // Evaluación OWASP A01:2021 - ¿Se impide el acceso directo a URLs no autorizadas?
    // Esto se verifica al comprobar si hay sesión activa y redirigir al login si no.
    return new Promise((resolve) => {
      this.sesionService.iniciarVerificacion().then((isAuthenticated) => {
        if (isAuthenticated) {

          // 👉 Evaluación OWASP A01:2021 - ¿La app restringe correctamente el acceso a recursos según roles/permisos?
          const rolRequerido = next.data['rol'];
          const rolUsuario = this.sesionService.obtenerRolUsuario();

          if (rolRequerido && rolUsuario !== rolRequerido) {
            // Redirige si el rol no coincide
            this.router.navigate(['/acceso-denegado']);
            return resolve(false);
          }

          return resolve(true);
        } else {
          this.router.navigate(['/login']);
          return resolve(false);
        }
      });
    });
  }
}

