import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private apiUrl = 'http://localhost:3000/expedientes';

  constructor(private http: HttpClient) {}

  crearExpediente(datosExpediente: FormData) {
    return this.http.post(`${this.apiUrl}`, datosExpediente);
  }

  obtenerExpedientes(filtro?: any) {
    return this.http.get(`${this.apiUrl}`, { params: filtro });
  }

  eliminarExpediente(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  enviarExpedienteParaRevision(datosExpediente: FormData) {
    return this.http.post(`${this.apiUrl}/revision`, datosExpediente);
  }
  getDocumentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documentos`);
  }
  
}
