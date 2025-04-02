import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../../services/upload-file.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarraLateralComponent } from '../../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { BreadcrumbsComponent } from '../../breadcrumbs/breadcrumbs.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../services/modal.service';
import { ModalActualizarAudienciaComponent } from '../../modals/modal-actualizar-audiencia/modal-actualizar-audiencia.component';

declare var bootstrap: any;

@Component({
  selector: 'app-visualizar-pdf',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    BreadcrumbsComponent
  ],
  templateUrl: './visualizar-pdf.component.html',
  styleUrls: ['./visualizar-pdf.component.scss']
})
export class VisualizarPdfComponent implements OnInit {
  expedientes: any[] = [];
  pdfSrc: SafeResourceUrl | null = null;
  expedientePrioritario: string = '';
  expedienteArchivado: string = '';
  terminoBusqueda: string = '';
  expedientesFiltrados: any[] = [];
  
  // Nuevas propiedades para las funcionalidades
  mostrarFiltros: boolean = false;
  expedienteHover: number | null = null;
  mostrarBotonArriba: boolean = false;
  
  // Filtros
  filtroEstado: string = '';
  filtroFecha: string = '';
  filtroAbogado: string = '';

  expedienteSeleccionado: any = null;
  fechaAudiencia: string = '';

  constructor(
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadExpedientes();
    
    // Verificar scroll al cargar
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.mostrarBotonArriba = window.scrollY > 300;
    }
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  onMouseEnter(idExpediente: number) {
    this.expedienteHover = idExpediente;
  }

  onMouseLeave(idExpediente: number) {
    if (this.expedienteHover === idExpediente) {
      this.expedienteHover = null;
    }
  }

  buscar(): void {
    const termino = this.terminoBusqueda.toLowerCase().trim();
  
    if (termino === '') {
      this.expedientesFiltrados = [...this.expedientes];
    } else {
      this.expedientesFiltrados = this.expedientes.filter(expediente =>
        expediente.numeroExpediente.toLowerCase().includes(termino) ||
        expediente.nombreExpediente.toLowerCase().includes(termino) ||
        expediente.datosCliente.toLowerCase().includes(termino) ||
        expediente.datosAbogado.toLowerCase().includes(termino)
      );
    }
    
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let resultados = [...this.expedientes];
    
    // Aplicar filtro de búsqueda si hay término
    if (this.terminoBusqueda.trim() !== '') {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultados = resultados.filter(expediente =>
        expediente.numeroExpediente.toLowerCase().includes(termino) ||
        expediente.nombreExpediente.toLowerCase().includes(termino) ||
        expediente.datosCliente.toLowerCase().includes(termino) ||
        expediente.datosAbogado.toLowerCase().includes(termino)
      );
    }
    
    // Aplicar filtro de estado
    if (this.filtroEstado) {
      resultados = resultados.filter(expediente => 
        expediente.estado.toLowerCase() === this.filtroEstado.toLowerCase()
      );
    }

    if (this.filtroFecha) {
      resultados = resultados.filter(expediente => 
        expediente.fechaCreacion.includes(this.filtroFecha)
      );
    }

    if (this.filtroAbogado) {
      const terminoAbogado = this.filtroAbogado.toLowerCase().trim();
      resultados = resultados.filter(expediente => 
        expediente.datosAbogado.toLowerCase().includes(terminoAbogado)
      );
    }
    
    this.expedientesFiltrados = resultados;
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
            ultimaActualizacion: expediente.ultimaActualizacion || 'No disponible',
            proximaAudiencia: expediente.proximaAudiencia || 'No programada'
          };
        });

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
    const expediente = this.expedientes.find(e => e.idExpediente.toString() === idExpediente);
    if (expediente) {
      this.abrirModalAudiencia(expediente);
    }
  }

  actualizarFechasExpediente(idExpediente: number, fechaAudiencia: string): void {
    const fechaActual = new Date().toISOString().split('T')[0];
    
    this.uploadFileService.actualizarFechasExpediente(
      idExpediente.toString(),
      fechaActual,
      fechaAudiencia
    ).subscribe({
      next: (response) => {
        console.log('Fechas actualizadas:', response);
        // Actualizar la vista
        const expediente = this.expedientes.find(e => e.idExpediente === idExpediente);
        if (expediente) {
          expediente.ultimaActualizacion = fechaActual;
          expediente.proximaAudiencia = fechaAudiencia;
        }
      },
      error: (error) => {
        console.error('Error al actualizar fechas:', error);
        alert('Hubo un error al actualizar las fechas');
      }
    });
  }

  programarProximaAudiencia(idExpediente: number): void {
    const modalRef = this.modalService.open(ModalActualizarAudienciaComponent);
    modalRef.componentInstance.idExpediente = idExpediente;
    
    modalRef.result.then((result) => {
      if (result && result.fecha) {
        this.uploadFileService.actualizarProximaAudiencia(
          idExpediente.toString(),
          result.fecha
        ).subscribe({
          next: (response) => {
            console.log('Próxima audiencia actualizada:', response);
            // Actualizar la vista sin recargar la página
            const expediente = this.expedientes.find(e => e.idExpediente === idExpediente);
            if (expediente) {
              expediente.proximaAudiencia = result.fecha;
            }
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
            alert('Hubo un error al programar la audiencia');
          }
        });
      }
    }).catch(() => {
      // Se cancela el modal
    });
  }
  
  actualizarUltimaModificacion(idExpediente: number): void {
    const fechaActual = new Date().toISOString().split('T')[0];
    
    this.uploadFileService.actualizarUltimaModificacion(
      idExpediente.toString(), 
      fechaActual
    ).subscribe({
      next: (response) => {
        console.log('Última actualización modificada:', response);
        // Actualizar la vista
        const expediente = this.expedientes.find(e => e.idExpediente === idExpediente);
        if (expediente) {
          expediente.ultimaActualizacion = fechaActual;
        }
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
      }
    });
  }

  abrirModalAudiencia(expediente: any): void {
    this.expedienteSeleccionado = expediente;
    this.fechaAudiencia = expediente.proximaAudiencia || '';
    const modalElement = document.getElementById('audienciaModal');
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  }

  cerrarModalAudiencia(): void {
    this.expedienteSeleccionado = null;
    this.fechaAudiencia = '';
    const modalElement = document.getElementById('audienciaModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    }
  }

  guardarAudiencia(): void {
    if (!this.fechaAudiencia) {
      alert('Por favor seleccione una fecha válida');
      return;
    }

    if (this.expedienteSeleccionado) {
      this.uploadFileService.actualizarProximaAudiencia(
        this.expedienteSeleccionado.idExpediente.toString(),
        this.fechaAudiencia
      ).subscribe({
        next: (response) => {
          console.log('Audiencia actualizada:', response);
          // Actualizar la vista
          const expediente = this.expedientes.find(e => e.idExpediente === this.expedienteSeleccionado.idExpediente);
          if (expediente) {
            expediente.proximaAudiencia = this.fechaAudiencia;
            expediente.ultimaActualizacion = new Date().toISOString().split('T')[0];
          }
          this.cerrarModalAudiencia();
        },
        error: (error) => {
          console.error('Error al actualizar:', error);
          alert('Hubo un error al programar la audiencia');
        }
      });
    }
  }
  
}
