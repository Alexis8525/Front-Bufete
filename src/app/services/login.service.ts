import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  
  login(nombreUsuario: string, pass: string): Observable<any> {
    return this.http.post('http://localhost/16:3000/login', {
      nombreUsuario,
      pass
    });
  }
}
