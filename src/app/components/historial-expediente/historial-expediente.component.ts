import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule , isPlatformBrowser} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial-expediente',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './historial-expediente.component.html',
  styleUrls: ['./historial-expediente.component.css'],
})
export class HistorialExpedienteComponent implements OnInit {
  expedientes: any[] = [];
  pdfSrc: SafeResourceUrl | null = null; // Para el modal de documentos
  selectedExpediente: any | null = null; // Expediente seleccionado para visualizar detalles

  constructor(
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer // Inyecta DomSanitizer
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadExpedientes();
    }
  }

  loadExpedientes(): void {
    this.uploadFileService.getHistorialExpedienteCompleto().subscribe(
      (response: any[]) => {
        this.expedientes = response.map((expediente: any) => {
          return {
            ...expediente,
            documentos: expediente.documentos || []
          };
        });
      },
      (error: any) => {
        console.error('Error al obtener los expedientes:', error);
      }
    );
  }

  verDetallesExpediente(expediente: any): void {
    this.selectedExpediente = expediente;
  }

  abrirModal(documentoBase64: string): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      import('bootstrap').then((bootstrap) => {
        this.pdfSrc = `data:application/pdf;base64,${documentoBase64}`;
        const modalElement = document.getElementById('pdfModal');
        if (modalElement) {
          const modalInstance = new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      });
    }
  }

  cerrarModal(): void {
    this.pdfSrc = null;
  }
}
