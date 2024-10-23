import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  upload_file(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/upload-file`, { username, password });
}
}
