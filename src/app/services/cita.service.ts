import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';  

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private URL_API = 'http://localhost:3000/citas'; // Cambia esto si es necesario

  constructor(private http: HttpClient) { }

  // Obtener la lista de citas
  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.URL_API);
  }
}
