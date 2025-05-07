import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expediente } from '../models/expediente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  private URL_API = 'http://localhost:3000/expedienteN';
  //private URL_API = 'https://fkgm057s-3000.usw3.devtunnels.ms/expedienteN';

  constructor(private http: HttpClient) { }

  // Obtener todos los expedientes
  getExpedientes(): Observable<Expediente[]> {
    return this.http.get<Expediente[]>(this.URL_API);
  }
  
  // Obtener información general de un expediente por su número
  getInformacionGeneral(idExpediente: number): Observable<Expediente> {
    return this.http.get<Expediente>(`${this.URL_API}/informacion-general/${idExpediente}`);
  }

  // Obtener información de las partes relacionadas por número de expediente
  getPartesPorExpediente(idExpediente: number): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/partes-expediente/${idExpediente}`);
  }

  agregarParte(idExpediente: string | number, partes: { 
  demandantes: any[], 
  demandados: any[], 
  terceros: any[] 
}): Observable<any> {
  // Convertir a número si es string
  const id = typeof idExpediente === 'string' ? parseInt(idExpediente) : idExpediente;
  
  return this.http.post<any>(`${this.URL_API}/agregar-parte`, { 
    idExpediente: id,
    partes 
  });
}
  
  
}
