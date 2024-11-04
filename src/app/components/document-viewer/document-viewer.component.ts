import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [CommonModule], // Añade aquí otros módulos si tu template lo requiere
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css'] // Corrección en el nombre
})
export class DocumentViewerComponent implements OnInit {
  documentos: any[] = []; // Array para almacenar los documentos

  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit(): void {
    this.cargarDocumentos(); // Cargar documentos al iniciar
  }

  cargarDocumentos() {
    this.uploadFileService.getDocumentos().subscribe({
      next: (data: any) => {
        this.documentos = data; // Asignar los documentos recibidos
      },
      error: (err: any) => {
        console.error('Error al cargar los documentos', err);
      },
    });
  }

  obtenerUrlArchivo(documento: any): string {
    return `url-to-fetch-file/${documento.id}`; // Modifica según tu lógica de URL
  }
}
