import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente';  // Asegúrate de que el path sea correcto

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  URL_API = 'http://localhost:3000/clientes/';

  public cliente: Cliente = {
    idCliente: 0,
    nombreCliente: '',
    aPCliente: '',
    aMCliente: '',
    direccion: '',
    correo: '',
    telefono: '',
    pass: '', 
    idUsuarioFK: 0,
    idRolFK: 0 
  };

  clientes: Cliente[] = [];

  // Obtener la lista de clientes
  getClientes() {
    return this.http.get<Cliente[]>(this.URL_API);
  }

  // Crear un nuevo cliente
  crearCliente(cliente: Cliente) {
    return this.http.post(this.URL_API, cliente);
  }

  // Actualizar cliente
  actualizarCliente(cliente: Cliente) {
    return this.http.put(this.URL_API + cliente.idCliente, cliente);
  }

  // Eliminar cliente
  eliminarCliente(idCliente: number) {
    return this.http.delete(this.URL_API + idCliente);
  }
}
