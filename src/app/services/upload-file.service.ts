  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable, throwError } from 'rxjs';
  import { catchError, timeout } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root',
  })
  export class UploadFileService {
    private apiUrl = 'http://localhost:3000/expedientes';
    //private apiUrl = 'https://fkgm057s-3000.usw3.devtunnels.ms/expedientes';
    
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

    // Métodos nuevos para audiencias
    programarAudiencia(idExpediente: string, audienciaData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/${idExpediente}/audiencias`, audienciaData)
        .pipe(catchError(this.manejarError));
    }

    obtenerAudiencias(idExpediente: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/${idExpediente}/audiencias`)
        .pipe(catchError(this.manejarError));
    }

    actualizarAudiencia(idExpediente: string, idAudiencia: string, audienciaData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${idExpediente}/audiencias/${idAudiencia}`, audienciaData)
        .pipe(catchError(this.manejarError));
    }

    // Métodos existentes con mejoras
    actualizarUltimaModificacion(idExpediente: string): Observable<any> {
      return this.http.put(`${this.apiUrl}/${idExpediente}/ultima-actualizacion`, {})
        .pipe(catchError(this.manejarError));
    }

    actualizarProximaAudiencia(idExpediente: string, fecha: string): Observable<any> {
      return this.http.put(`${this.apiUrl}/${idExpediente}/proxima-audiencia`, { fecha })
          .pipe(
              catchError((error) => {
                  console.error('Error en actualizarProximaAudiencia:', error);
                  
                  if (error.status === 500 && error.error?.solution) {
                      // Mostrar mensaje más útil al usuario
                      return throwError(() => new Error(`
                          Error de configuración: ${error.error.message}.
                          ${error.error.solution}
                      `));
                  }
                  
                  return this.manejarError(error);
              })
          );
  }

    // Resto de métodos existentes...
    crearExpediente(expedienteData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}`, expedienteData)
        .pipe(catchError(this.manejarError));
    }

    obtenerExpedientes(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}`)
        .pipe(catchError(this.manejarError));
    }

    eliminarExpediente(id: string) {
      return this.http.delete(`${this.apiUrl}/${id}`)
        .pipe(catchError(this.manejarError));
    }

    getDocumentos(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/documentos`)
        .pipe(catchError(this.manejarError));
    }

    getExpedienteCompleto(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}`)
        .pipe(catchError(this.manejarError));
    }

    subirDocumentos(idExpediente: number, documentos: { documentoBase64: string, idTipoDocumentoFK: number }[]): Observable<any> {
      return this.http.post(`${this.apiUrl}/subirDocumento`, {
        idExpedienteFK: idExpediente,
        documentos,
      }).pipe(catchError(this.manejarError));
    }

    getHistorialExpedienteCompleto(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/historial-expedientes`)
        .pipe(catchError(this.manejarError));
    }
    cerrarExpediente(idExpediente: number): Observable<{
      success: boolean;
      message: string;
      idExpediente?: number;
      estado?: string;
      fechaCierre?: string;
      executionTime?: string;
    }> {
      // Validación adicional en el frontend
      if (!idExpediente || idExpediente <= 0) {
        return throwError(() => ({
          success: false,
          message: "ID de expediente inválido",
          code: "INVALID_ID_CLIENT"
        }));
      }
    
      return this.http.put<{
        success: boolean;
        message: string;
        idExpediente?: number;
        estado?: string;
        fechaCierre?: string;
        executionTime?: string;
      }>(`${this.apiUrl}/cerrar`, { idExpediente }).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error en cerrarExpediente:', {
            error,
            url: error.url,
            status: error.status,
            statusText: error.statusText,
            errorDetails: error.error
          });
          
          let errorMessage = 'Error al cerrar expediente';
          let errorCode = 'UNKNOWN_ERROR';
          
          if (error.error && typeof error.error === 'object') {
            errorMessage = error.error.message || errorMessage;
            errorCode = error.error.code || errorCode;
          } else if (error.status === 0) {
            errorMessage = 'No se pudo conectar al servidor';
            errorCode = 'CONNECTION_ERROR';
          } else if (error.status === 404) {
            errorMessage = 'Expediente no encontrado';
            errorCode = 'NOT_FOUND';
          } else if (error.status === 400) {
            errorMessage = error.error?.message || 'Datos inválidos';
            errorCode = error.error?.code || 'BAD_REQUEST';
          }
          
          return throwError(() => ({
            success: false,
            message: errorMessage,
            code: errorCode,
            status: error.status,
            details: error.error
          }));
        }),
        timeout(30000) // Timeout de 30 segundos
      );
    }
    
  }
