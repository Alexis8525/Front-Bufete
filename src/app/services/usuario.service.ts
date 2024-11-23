import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';  // Asegúrate de que el path sea correcto

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  URL_API = 'http://172.19.0.1:3000/usuarios/';

  public usuario: Usuario = {
    idUsuario: 0,
    nombreUsuario: '',
    pass: '',
    estado: false,
    idRolFK: 0,
    idEmpleadoFK: 0,
    idClienteFK: 0
  };

  usuarios: Usuario[] = [];

  // Obtener la lista de usuarios
  getUsuarios() {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  // Crear un nuevo usuario
  crearUsuario(usuario: Usuario) {
    return this.http.post(this.URL_API, usuario);
  }

  // Actualizar usuario
  actualizarUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + usuario.idUsuario, usuario);
  }

  // Eliminar usuario
  eliminarUsuario(idUsuario: number) {
    return this.http.delete(this.URL_API + idUsuario);
  }

  // Método para login
  login(email: string, password: string) {
    return this.http.post(`${this.URL_API}login`, { email, password });
  }
}
