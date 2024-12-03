import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private apiUrl = 'http://localhost:3000/documentos';
    constructor(private http: HttpClient) {}

    subirDocumentos(idExpediente: number, documentos: { documentoBase64: string, idTipoDocumentoFK: number }[]): Observable<any> {
      const payload = { idExpedienteFK: idExpediente, documentos };
      console.log('Payload enviado al servidor:', payload); // Validar aquí
      return this.http.post(`${this.apiUrl}/subirDocumento`, payload);
    }
    
  obtenerExpedientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtenerExp`);
  }

  obtenerTiposDocumentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tiposDocumentos`);
  }
}
