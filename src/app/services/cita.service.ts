import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';  
import { EspecialidadCita } from '../models/especialidad-cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private URL_API = 'http://localhost:3000/citas';

  public especialidades: EspecialidadCita[] = [];

  constructor(private http: HttpClient) { }

  // Obtener la lista de citas
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.URL_API);
  }

  // Obtener abogados por servicio
getAbogadosPorServicio(idServicio: number): Observable<EspecialidadCita[]> {
  return this.http.get<EspecialidadCita[]>(`${this.URL_API}/abogados/${idServicio}`); 
}
  
  
}
