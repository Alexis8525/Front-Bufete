import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CitaExpedienteService {
  private apiUrl = 'http://localhost:3000/api/citasExpediente';

  constructor(private http: HttpClient) {}

  // Obtener citas por expediente
  getCitasByExpediente(idExpediente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expediente/${idExpediente}`);
  }

  // Crear cita
  crearCitaConExpediente(cita: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cita);
  }

  // Eliminar cita
  eliminarCita(idCita: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idCita}`);
  }

  // Obtener el expediente (Método agregado)
  getExpediente(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/expedientes');
  }
}
