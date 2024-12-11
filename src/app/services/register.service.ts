import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(user: { nombreUsuario: string; pass: string; estado: boolean; idRolFK: number; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
