import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private apiUrl = 'http://localhost:3000/expedientes';
  constructor(private http: HttpClient, private router: Router) {}

  private manejarError(error: HttpErrorResponse) {
    const urlActual = this.router.url;
    let mensajeError = 'Ocurrió un error inesperado.';

    switch (error.status) {
      case 400:
        mensajeError = 'Error 400: Solicitud incorrecta.';
        this.router.navigate(['/error/400'], { queryParams: { returnUrl: urlActual } });
        break;
      case 402:
        mensajeError = 'Error 402: Se requiere pago.';
        this.router.navigate(['/error/402'], { queryParams: { returnUrl: urlActual } });
        break;
      case 403:
        mensajeError = 'Error 403: Acceso prohibido.';
        this.router.navigate(['/error/403'], { queryParams: { returnUrl: urlActual } });
        break;
      default:
        mensajeError = `Error ${error.status}: ${error.message}`;
        this.router.navigate(['/error/404'], { queryParams: { returnUrl: urlActual } });
        break;
    }

    return throwError(() => new Error(mensajeError));
  }

  actualizarUltimaModificacion(idExpediente: string, fecha: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/expedientes/${idExpediente}/ultima-actualizacion`, { fecha });
  }

  actualizarProximaAudiencia(idExpediente: string, fecha: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/expedientes/${idExpediente}/proxima-audiencia`, { fecha });
  }

  actualizarFechasExpediente(idExpediente: string, ultimaActualizacion: string, proximaAudiencia: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/expedientes/${idExpediente}/fechas`, {
      ultimaActualizacion,
      proximaAudiencia
    });
  }

  crearExpediente(expedienteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, expedienteData).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  // Obtener todos los expedientes
  obtenerExpedientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  // Eliminar expediente
  eliminarExpediente(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  // Obtener documentos de expedientes
  getDocumentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documentos`).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  getExpedienteCompleto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  subirDocumentos(idExpediente: number, documentos: { documentoBase64: string, idTipoDocumentoFK: number }[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/subirDocumento`, {
      idExpedienteFK: idExpediente, // El backend espera este nombre exacto
      documentos,
    }).pipe(
      catchError((error) => this.manejarError(error))
    );
  }

  getHistorialExpedienteCompleto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historial-expedientes`).pipe(
      catchError((error) => this.manejarError(error))
    );
  }
}
