import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  URL_API = 'http://localhost:3000/usuarios/';

  public usuario: Usuario = {
    idUsuario: 0,
    nombreUsuario: '',
    pass: '',
    estado: false,
    idRolFK: 0,
    idEmpleadoFK: 0,
    idClienteFK: 0,
  };

  usuarios: Usuario[] = [];

  private manejarError(error: HttpErrorResponse) {
    let mensajeError = 'Ocurrió un error inesperado.';
    
    switch (error.status) {
      case 400:
        mensajeError = 'Error 400: Solicitud incorrecta.';
        break;
      case 402:
        mensajeError = 'Error 402: Se requiere pago.';
        break;
      case 403:
        mensajeError = 'Error 403: Acceso prohibido.';
        break;
      default:
        mensajeError = `Error ${error.status}: ${error.message}`;
        break;
    }

    window.alert(mensajeError);
    return throwError(() => new Error(mensajeError));
  }

  getUsuarios() {
    return this.http.get<Usuario[]>(this.URL_API).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(this.URL_API, usuario).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + usuario.idUsuario, usuario).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  eliminarUsuario(idUsuario: number) {
    return this.http.delete(this.URL_API + idUsuario).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  login(email: string, password: string, recaptcha: string) {
    return this.http.post(`${this.URL_API}login`, { email, password, recaptcha }).pipe(
      catchError((error) => this.manejarError(error))
    );
  }
}
