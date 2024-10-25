import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  expediente: any = {
    nombreExpediente: '',
    numeroExpediente: '',
    anioExpediente: null
  };
  archivo: File | null = null;

  constructor(private uploadFileService: UploadFileService) {}

  onFileSelected(event: any) {
    this.archivo = event.target.files[0];
  }

  onSubmit() {
    if (!this.archivo || !this.expediente.nombreExpediente) {
      console.error('Faltan datos');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', this.archivo);
    formData.append('nombreExpediente', this.expediente.nombreExpediente);
    formData.append('numeroExpediente', this.expediente.numeroExpediente);
    formData.append('anioExpediente', this.expediente.anioExpediente);

    this.uploadFileService.crearExpediente(formData).subscribe({
      next: () => console.log('Expediente creado exitosamente'),
      error: (err) => console.error('Error al crear el expediente', err),
    });
  }
}
