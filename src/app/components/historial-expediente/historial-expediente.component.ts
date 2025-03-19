import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var bootstrap: any;

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
  expedientesFiltrados: any[] = [];
  pdfSrc: SafeResourceUrl | null = null;
  terminoBusqueda: string = '';

  constructor(
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer
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

        // Inicializar la lista filtrada con todos los expedientes
        this.expedientesFiltrados = [...this.expedientes];
      },
      (error: any) => {
        console.error('Error al obtener los expedientes:', error);
      }
    );
  }

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

  cerrarModal(): void {
    this.pdfSrc = null;
  }
}
