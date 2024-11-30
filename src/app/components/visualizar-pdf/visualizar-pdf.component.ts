import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ExpedienteBase, PrioritarioExpediente, ArchivadoExpediente, ExpedienteComponent } from '../../models/expediente.decorator';



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
  expedientePrioritario: string = ''; // Inicializado
  expedienteArchivado: string = ''; // Inicializado

  constructor(
    private http: HttpClient,
    
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer // Inyección de dependencias
  ) {}

  ngOnInit(): void {
    const expedienteBase = new ExpedienteBase();
    const expedientePrioritario = new PrioritarioExpediente(expedienteBase);
    const expedienteArchivado = new ArchivadoExpediente(expedienteBase);

    this.expedientePrioritario = expedientePrioritario.getDetalle();
    this.expedienteArchivado = expedienteArchivado.getDetalle();

    // Cargar expedientes
    this.loadExpedientes();
  }
  
  loadExpedientes(): void {
    this.uploadFileService.getExpedienteCompleto().subscribe(
      (response: any[]) => {
        console.log('Datos recibidos:', response); // Agregado
        this.expedientes = response.map((expediente: any) => {
          let expedienteComponent: ExpedienteComponent = new ExpedienteBase();
          if (expediente.estado === 'PRIORITARIO') {
            expedienteComponent = new PrioritarioExpediente(expedienteComponent);
          }
          if (expediente.archivado) {
            expedienteComponent = new ArchivadoExpediente(expedienteComponent);
          }
          return {
            ...expediente,
            detalle: expedienteComponent.getDetalle()
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
