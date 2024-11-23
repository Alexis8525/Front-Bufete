import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://172.19.0.1/16:3000';

  constructor(private http: HttpClient) {}
  
  login(nombreUsuario: string, pass: string): Observable<any> {
    return this.http.post('http://172.19.0.1/16:3000/login', {
      nombreUsuario,
      pass
    });
  }
}
