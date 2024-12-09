import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';  
import { EspecialidadCita } from '../models/especialidad-cita';
import { FechaCita } from '../models/fechas-citas';
import { CitaDetallada } from '../models/cita-detallada';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private URL_API = 'http://localhost:3000/citas';

  public especialidades: EspecialidadCita[] = [];
  public citas: Cita[] = [];

  constructor(private http: HttpClient) { }

  // Obtener la lista de citas
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.URL_API);
  }

  // Obtener abogados por servicio
  getAbogadosPorServicio(idServicio: number): Observable<EspecialidadCita[]> {
    return this.http.get<EspecialidadCita[]>(`${this.URL_API}/abogados/${idServicio}`); 
  }

  getHorariosDisponiblesPorAbogado(idEmpleado:number ): Observable<EspecialidadCita[]>{
    return this.http.get<EspecialidadCita[]>(`${this.URL_API}/horarios/${idEmpleado}`);  
  }

  // Crear una cita con transacción
  crearCitaConTransaccion(citaData: Cita): Observable<Cita[]> {
    return this.http.post<Cita[]>(`${this.URL_API}/crear-cita`, citaData); 
  }

  // Obtener las citas de un cliente específico
  getCitasByCliente(idCliente: number): Observable<FechaCita[]> {
    return this.http.get<FechaCita[]>(`${this.URL_API}/consultar-citaC/${idCliente}`);
  }

  // Obtener las citas de un abogado específico
  getCitasByAbogado(idAbogado: number): Observable<FechaCita[]> {
    return this.http.get<FechaCita[]>(`${this.URL_API}/consultar-citaA/${idAbogado}`);
  }

  // Obtener los clientes de un abogado específico con citas programadas
  getClientesPorAbogado(idAbogado: number): Observable<FechaCita[]> {
    return this.http.get<FechaCita[]>(`${this.URL_API}/clientes/abogado/${idAbogado}`);
  }

  // Cancelar una cita
  cancelarCita(idCita: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.URL_API}/cancelar`, { idCita });
  }

  // Completar una cita
  completarCita(idCita: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.URL_API}/completar-cita`, { idCita });
  }

  // Obtener servicios únicos asociados a las citas de un cliente específico
  getServiciosPorCitasDeCliente(idCliente: number): Observable<{ idServicio: number; nombreServicio: string }[]> {
    return this.http.get<{ idServicio: number; nombreServicio: string }[]>(`${this.URL_API}/clientes/${idCliente}/servicios`);
  }

  // Obtener la lista de citas con información detallada
  getAllCitas(): Observable<CitaDetallada[]> {
    return this.http.get<CitaDetallada[]>(`${this.URL_API}/detalladas`);
  }
  getCitasCompletadasByExpediente(numeroExpediente: string): Observable<CitaDetallada[]> {
    return this.http.get<CitaDetallada[]>(`${this.URL_API}/expediente/${numeroExpediente}`);
  }

  // Obtener citas completadas por número de expediente
  getCitasCompletadasByExpediente(numeroExpediente: string): Observable<CitaDetallada[]> {
    return this.http.get<CitaDetallada[]>(`${this.URL_API}/expediente/${numeroExpediente}`);
  }


}