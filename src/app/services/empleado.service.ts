import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  URL_API = 'http://localhost:3000/empleados/';

  public empleado: Empleado = {
    idEmpleado: 0,
    fechaIngreso: '',
    numeroLicencia: '',
    correo: '',
    nombreEmpleado: '',
    aPEmpleado: '',
    aMEmpleado: '',
    telefono: '',
    especialidad: '',
    pass: '', 
    idRolFK: 0, 
    idEspecialidadFK: 0 
  };

  empleados: Empleado[] = [];

  // Obtener la lista de empleados
  getEmpleadoAbogado() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  // Crear un nuevo empleado
  crearEmpleado(empleado: Empleado) {
    return this.http.post(this.URL_API, empleado);
  }

  // Actualizar empleado
  actualizarEmpleado(empleado: Empleado) {
    return this.http.put(this.URL_API+empleado.idEmpleado, empleado);
  }

  // Eliminar empleado
  eliminarEmpleado(idEmpleado: number) {
    return this.http.delete(this.URL_API+idEmpleado);
  }
}
