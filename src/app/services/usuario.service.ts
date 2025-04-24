import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  //URL_API = 'http://localhost:3000/usuarios/';
  URL_API = 'https://fkgm057s-3000.usw3.devtunnels.ms/usuarios/';

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

  getUsuarios() {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(this.URL_API, usuario);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + usuario.idUsuario, usuario);
  }

  eliminarUsuario(idUsuario: number) {
    return this.http.delete(this.URL_API + idUsuario);
  }

  login(email: string, password: string, recaptcha: string) {
    return this.http.post(`${this.URL_API}login`, { email, password, recaptcha });
  }

  verifyOTP(email: string, otp: string) {
    return this.http.post(`${this.URL_API}verify-otp`, { email, otp });
  }

  enviarCorreoRecuperacion(email: string) {
    return this.http.post(`${this.URL_API}recuperar-contrasena`, { email });
  }

  restablecerContrasena(token: string, nuevaContrasena: string) {
    console.log('Enviando datos al backend:', { token, nuevaContrasena });
    return this.http.post(`${this.URL_API}restablecer-contrasena`, {
      token,
      nuevaContrasena,
    });
  }

  isLoggedIn(): boolean {
    // Verifica si estamos en el navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token && !this.isTokenExpired()) {
        return true;
      }
    }
    return false;
  }

  isTokenExpired(): boolean {
    const exp = localStorage.getItem('exp');
    if (!exp) return true;
    return Date.now() > parseInt(exp, 10);
  }
}
