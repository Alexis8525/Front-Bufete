import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expediente } from '../models/expediente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  private URL_API = 'http://localhost:3000/expedienteN';

  constructor(private http: HttpClient) { }

  // Obtener todos los expedientes
  getExpedientes(): Observable<Expediente[]> {
    return this.http.get<Expediente[]>(this.URL_API);
  }

  // Crear un expediente
  crearExpediente(expedienteData: Expediente): Observable<Expediente> {
    return this.http.post<Expediente>(`${this.URL_API}/crear`, expedienteData);
  }

  // Actualizar un expediente
  updateExpediente(expedienteData: Expediente): Observable<Expediente> {
    return this.http.put<Expediente>(`${this.URL_API}/actualizar`, expedienteData);
  }

  // Eliminar un expediente por su ID
  deleteExpediente(idExpediente: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_API}/eliminar/${idExpediente}`);
  }
  
  // Obtener información general de un expediente por su número
  getInformacionGeneral(idExpediente: number): Observable<Expediente> {
    return this.http.get<Expediente>(`${this.URL_API}/informacion-general/${idExpediente}`);
  }

  // Obtener información de las partes relacionadas por número de expediente
  getPartesPorExpediente(idExpediente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL_API}/partes-expediente/${idExpediente}`);
  }
  agregarParte(idExpediente: number, parteData: any): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/agregar-parte`, { idExpediente, ...parteData });
  }
  
}
