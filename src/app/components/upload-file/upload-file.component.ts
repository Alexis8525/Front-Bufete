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
    estado: 'En revisión', // Estado inicial
    descripcion: '',
    idClienteFK: 100003, // ID del cliente (puedes adaptarlo según tu lógica)
    idEmpleadoFK: 1002    // ID del empleado (puedes adaptarlo según tu lógica)
  };
  archivos: { [key: string]: string | null } = {};
  idExpedienteCreado: number | null = null;

  constructor(private http: HttpClient, private uploadFileService: UploadFileService) { }
  
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

  crearExpediente() {
    this.uploadFileService.crearExpediente(this.expediente).subscribe({
      next: (response: any) => {
        this.idExpedienteCreado = response.idExpediente;
        console.log('Expediente creado:', response);
      },
      error: (err: any) => {
        console.error('Error al crear el expediente', err);
      }
    });
  }

  subirDocumentos() {
    if (!this.idExpedienteCreado) {
        console.error('No se ha creado un expediente');
        return;
    }

    // Construir el array de documentos
    const documentos = Object.keys(this.archivos).map((tipoDocumento) => {
        return {
            documentoBase64: this.archivos[tipoDocumento] || '',
            idTipoDocumentoFK: this.obtenerIdTipoDocumento(tipoDocumento) // Método para obtener el ID correspondiente
        };
    });

    // Crear el FormData con documentos base64
    const formData = new FormData();
    formData.append('documentos', JSON.stringify(documentos));

    // Enviar los documentos
    this.uploadFileService.subirDocumentos(this.idExpedienteCreado, documentos, formData).subscribe({
        next: (response: any) => {
            console.log('Documentos subidos correctamente:', response);
        },
        error: (err: any) => {
            console.error('Error al subir los documentos', err);
        }
    });
}


// Método auxiliar para obtener el ID del tipo de documento
obtenerIdTipoDocumento(tipoDocumento: string): number {
    const tipoDocumentoIds: { [key: string]: number } = {
        'CURP': 1,
        'CV': 2,
        'Comprobante de Domicilio': 3,
        'NSS': 4,
        'Identificación Oficial': 5
    };
    return tipoDocumentoIds[tipoDocumento] || 0;
}


  onSubmit() {
    this.crearExpediente();
  }
}
