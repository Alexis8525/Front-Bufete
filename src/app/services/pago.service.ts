import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pago } from '../models/pagos'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  url= 'http://localhost:3000/pagos/'

  constructor(private http: HttpClient) { }

  // Método para registrar un pago 
  crearPago(pago: Pago): Observable<any> {
    return this.http.post(this.url, pago);
  }
  pago:Pago[]=[];
  // Obtener la lista de pagos
  getPagos(folio: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.url}?folio=${folio}`);
  }

}