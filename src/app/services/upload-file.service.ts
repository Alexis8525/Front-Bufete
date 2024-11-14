import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private apiUrl = 'http://localhost:3000/expedientes'; // Asegúrate de que la URL esté correcta

  constructor(private http: HttpClient) {}

  // Crear expediente con Base64
  crearExpediente(expedienteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, expedienteData);
  }

  // Obtener todos los expedientes
  obtenerExpedientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Eliminar expediente
  eliminarExpediente(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener documentos de expedientes
  getDocumentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documentos`);
  }
  
  getExpedienteCompleto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  subirDocumentos(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/subirDocumentos`, formData);
  }
}
