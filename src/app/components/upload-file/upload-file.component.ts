import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  nombreExpediente: string = '';
  archivo: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.archivo = event.target.files[0];
  }

  onSubmit() {
    if (!this.archivo || !this.nombreExpediente) {
      console.error('Faltan datos');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.archivo);
    formData.append('nombreExpediente', this.nombreExpediente);

    this.http.post('/upload-file', formData).subscribe({
      next: (res) => console.log('Archivo subido exitosamente'),
      error: (err) => console.error('Error al subir el archivo', err),
    });
  }
}
