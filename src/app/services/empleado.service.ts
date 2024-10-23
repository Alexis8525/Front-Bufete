import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../models/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  URL_API = 'http://localhost:3000/empleados/'

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
    idUsuarioFK: 0
  };

  empleados:Empleado[]=[];

  // Obtener la lista de empleados
  getEmpleadoAbogado() {
    return this.http.get<Empleado[]>(this.URL_API);
  }

}
