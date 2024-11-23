  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class UploadFileService {

    private apiUrl = 'http://172.19.0.1:3000/expedientes'; // Asegúrate de que la URL esté correcta

    constructor(private http: HttpClient) {}

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
    subirDocumentos(idExpediente: number, documentos: { documentoBase64: string, idTipoDocumentoFK: number }[], formData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/subirDocumentos`, { idExpediente, documentos, formData });
    }
    getHistorialExpedienteCompleto(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/historial-expedientes`);
    }

  }
