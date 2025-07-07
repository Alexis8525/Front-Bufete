import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(user: { nombreUsuario: string; pass: string; estado: boolean; idRolFK: number; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  

  login(nombreUsuario: string, pass: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', {
      nombreUsuario,
      pass
    });
  }

  upload_file(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/upload-file`, { username, password });
}
}
