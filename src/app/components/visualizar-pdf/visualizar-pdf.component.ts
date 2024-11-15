import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var bootstrap: any;

@Component({
  selector: 'app-visualizar-pdf',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './visualizar-pdf.component.html',
  styleUrls: ['./visualizar-pdf.component.scss']
})
export class VisualizarPdfComponent implements OnInit {
  expedientes: any[] = [];
  pdfSrc: SafeResourceUrl | null = null;

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
    this.uploadFileService.getExpedienteCompleto().subscribe(
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

  abrirModal(documentoBase64: string): void {
    // Sanitiza el valor de pdfSrc para evitar el error de seguridad
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${documentoBase64}`);
    const modalElement = document.getElementById('pdfModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }
  eliminarExpediente(idExpediente: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este expediente?')) {
      this.uploadFileService.eliminarExpediente(idExpediente.toString()).subscribe({
        next: (response) => {
          console.log('Expediente eliminado:', response);
          alert('El expediente ha sido eliminado correctamente.');
          location.reload();
        },
        error: (error) => {
          console.error('Error al eliminar el expediente:', error);
          alert('Hubo un error al eliminar el expediente.');
        }
      });
    }
  }
  confirmarEliminacion(idExpediente: number): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este expediente? Esta acción no se puede deshacer.');
    if (confirmacion) {
      this.eliminarExpediente(idExpediente);
    }
  }
  actualizarExpediente(idExpediente: string): void {
    // Lógica para actualizar el expediente.
    console.log(`Actualizando expediente con ID: ${idExpediente}`);
    alert('Funcionalidad de actualización no implementada aún.');
  }
  
}
