import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 

declare var bootstrap: any;

@Component({
  selector: 'app-visualizar-pdf',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './visualizar-pdf.component.html',
  styleUrls: ['./visualizar-pdf.component.scss']
})
export class VisualizarPdfComponent implements OnInit {
  expedientes: any[] = [];
  pdfSrc: SafeResourceUrl | null = null;
  expedientePrioritario: string = ''; // Inicializado
  expedienteArchivado: string = ''; // Inicializado
  terminoBusqueda: string = '';
  expedientesFiltrados: any[] = []; // Lista filtrada que se mostrará

  constructor(
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer
  ) {}

  buscar(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
  
    if (termino === '') {
      this.expedientesFiltrados = [...this.expedientes]; // Restaurar la lista completa si el campo está vacío
    } else {
      this.expedientesFiltrados = this.expedientes.filter(expediente =>
        expediente.numeroExpediente.toLowerCase().includes(termino) || // Buscar por número de expediente
        expediente.nombreExpediente.toLowerCase().includes(termino) || // Buscar por nombre del expediente
        expediente.datosCliente.toLowerCase().includes(termino) || // Buscar por datos del cliente
        expediente.datosAbogado.toLowerCase().includes(termino) // Buscar por datos del abogado
      );
    }
  }
  

  ngOnInit(): void {
    this.loadExpedientes();
  }
  
  loadExpedientes(): void {
    this.uploadFileService.getExpedienteCompleto().subscribe(
      (response: any[]) => {
        this.expedientes = response.map((expediente: any) => {
          const datosAbogado = expediente.datosAbogado ? JSON.parse(expediente.datosAbogado) : {};
          const datosAbogadoConcatenados = `${datosAbogado.nombreEmpleado || ''} ${datosAbogado.aPEmpleado || ''} ${datosAbogado.aMEmpleado || ''}, Licencia: ${datosAbogado.licencia || 'No registrada'}, Teléfono: ${datosAbogado.telefono || 'Sin teléfono'}`;

          const datosCliente = expediente.datosCliente ? JSON.parse(expediente.datosCliente) : {};
          const datosClienteConcatenados = `${datosCliente.nombreCliente || ''} ${datosCliente.aPCliente || ''} ${datosCliente.aMCliente || ''}, Dirección: ${datosCliente.direccion || 'No especificada'}, Teléfono: ${datosCliente.telefono || 'Sin teléfono'}, Correo: ${datosCliente.correo || 'Sin correo'}`;

          return {
            ...expediente,
            datosAbogado: datosAbogadoConcatenados,
            datosCliente: datosClienteConcatenados,
          };
        });

        // Copia inicial para mostrar todos los expedientes al inicio
        this.expedientesFiltrados = [...this.expedientes];
      },
      (error: any) => {
        console.error('Error al obtener los expedientes:', error);
      }
    );
  }

  abrirModal(documentoBase64: string): void {
    if (!documentoBase64) {
      alert('El documento no está disponible.');
      return;
    }
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
