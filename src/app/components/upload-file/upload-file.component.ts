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
  };
  archivos: { [key: string]: File | null } = {};

  constructor(private uploadFileService: UploadFileService) {}

  onFileSelected(event: any, tipoDocumento: string) {
    this.archivos[tipoDocumento] = event.target.files[0];
  }

  onSubmit() {
    if (!this.expediente.nombreExpediente || Object.values(this.archivos).some(file => file === null)) {
      console.error('Faltan datos');
      return;
    }
    const formData = new FormData();
    formData.append('nombreExpediente', this.expediente.nombreExpediente);
    formData.append('numeroExpediente', this.expediente.numeroExpediente);
    for (const [key, file] of Object.entries(this.archivos)) {
      formData.append(key, file as Blob);
    }
    this.uploadFileService.enviarExpedienteParaRevision(formData).subscribe({
      next: () => console.log('Expediente enviado para revisión exitosamente'),
      error: (err: any) => console.error('Error al enviar el expediente para revisión', err),
    });
  }
}
