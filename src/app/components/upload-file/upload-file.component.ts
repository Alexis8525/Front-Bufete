import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { FormsModule } from '@angular/forms';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  expediente: any = {
    nombreExpediente: '',
    numeroExpediente: '',
  };
  archivos: { [key: string]: string | null } = {};

  constructor(private http: HttpClient, private uploadFileService: UploadFileService) {
  }
  

  onFileSelected(event: any, tipoDocumento: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.archivos[tipoDocumento] = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    const expedienteData = {
      nombreExpediente: this.expediente.nombreExpediente,
      numeroExpediente: this.expediente.numeroExpediente,
      archivos: this.archivos
    };
    console.log(expedienteData)
    const requiredDocumentTypes = ['CURP', 'Curriculum Vitae', 'Comprobante de Domicilio', 'Número de Seguridad Social', 'Identificación Oficial'];

    if (!requiredDocumentTypes.every(tipo => this.archivos[tipo])) {
      console.error('Faltan archivos por cargar.');
      return;
    }

    const formData = new FormData();
    formData.append('expedienteData', JSON.stringify(expedienteData));

    Object.keys(this.archivos).forEach((tipoDocumento) => {
      const documentoBase64 = this.archivos[tipoDocumento];
      if (documentoBase64) {
        formData.append(tipoDocumento, documentoBase64);
      }
    });
    this.uploadFileService.crearExpediente(formData).subscribe({
      next: (response: any) => {
        console.log('Expediente enviado:', response);
      },
      error: (err: any) => {
        console.error('Error al enviar el expediente para revisión', err);
      }
    });
  }
}
