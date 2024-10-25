import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private apiUrl = 'http://localhost:3000/upload-file';

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
}
