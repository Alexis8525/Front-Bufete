import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfViewerService {

  constructor(private http: HttpClient) {}

  // Método para obtener el PDF en Base64 por ID
  getPdfDocument(id: number): Observable<any> {
    return this.http.get<any>(`http://172.19.0.1:3000/expedientes/documento/${id}`);
  }
}
