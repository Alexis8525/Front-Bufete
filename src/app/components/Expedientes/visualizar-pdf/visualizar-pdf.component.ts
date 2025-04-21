import { Component, OnInit, Inject, PLATFORM_ID, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UploadFileService } from '../../../services/upload-file.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarraLateralComponent } from '../../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; 
import { BreadcrumbsComponent } from '../../breadcrumbs/breadcrumbs.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalActualizarAudienciaComponent } from '../../modals/modal-actualizar-audiencia/modal-actualizar-audiencia.component';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  @ViewChild('pdfModal') pdfModal!: ElementRef;
  @ViewChild('audienciaModal') audienciaModal!: ElementRef;

  // Data stores
  private _expedientesCache: any[] = [];
  expedientesFiltrados: any[] = [];
  
  // UI State
  pdfSrc: SafeResourceUrl | null = null;
  terminoBusqueda: string = '';
  mostrarFiltros: boolean = false;
  expedienteHover: number | null = null;
  mostrarBotonArriba: boolean = false;
  navbarHidden: boolean = false;
  
  // Loading states
  loaded: boolean = false;
  loading: boolean = false;
  errorCarga: boolean = false;
  eliminandoExpediente: { [id: number]: boolean } = {};
  
  // Filters
  filtroEstado: string = '';
  filtroFecha: string = '';
  filtroAbogado: string = '';

  // Selected items
  expedienteSeleccionado: any = null;
  fechaAudiencia: string = '';
  audiencias: any[] = [];
  audienciasFiltradas: any[] = [];

  constructor(
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.checkScroll();
    
    // Temporal: Verificar estructura de datos
    this.uploadFileService.getExpedienteCompleto().subscribe(data => {
      console.log('Datos de expedientes:', data);
    });
  }

  loadInitialData(): void {
    if (!this.loaded) {
      this.cargarExpedientes();
    } else {
      this.aplicarFiltros();
    }
  }

  cargarExpedientes(forceReload: boolean = false): void {
    if (this._expedientesCache.length > 0 && !forceReload) {
      this.expedientesFiltrados = [...this._expedientesCache];
      this.loaded = true;
      return;
    }

    this.loading = true;
    this.errorCarga = false;

    this.uploadFileService.getExpedienteCompleto().pipe(
      tap((response) => {
        this._expedientesCache = this.mapearExpedientes(response);
        this.expedientesFiltrados = [...this._expedientesCache];
        this.loaded = true;
      }),
      catchError(error => {
        console.error('Error al obtener expedientes:', error);
        this.errorCarga = true;
        this.mostrarErrorCarga();
        return of([]);
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  cargarAudiencias(idExpediente: number): void {
    const cachedHearings = this._expedientesCache.find(e => e.idExpediente === idExpediente)?.audiencias;
    
    if (cachedHearings?.length > 0) {
      this.audiencias = cachedHearings;
      this.audienciasFiltradas = [...cachedHearings];
      return;
    }

    this.uploadFileService.obtenerAudiencias(idExpediente.toString()).subscribe({
      next: (audiencias) => {
        this.audiencias = audiencias;
        this.audienciasFiltradas = [...audiencias];
        
        const index = this._expedientesCache.findIndex(e => e.idExpediente === idExpediente);
        if (index !== -1) {
          this._expedientesCache[index].audiencias = audiencias;
        }
      },
      error: (error) => {
        console.error('Error al cargar audiencias:', error);
        this.mostrarAlerta('Error al cargar las audiencias', 'danger');
      }
    });
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
    const filtrosContainer = document.querySelector('.filtros-container');
    if (filtrosContainer) {
      this.renderer.setStyle(
        filtrosContainer, 
        'max-height', 
        this.mostrarFiltros ? '200px' : '0'
      );
    }
  }

  onMouseEnter(idExpediente: number) {
    this.expedienteHover = idExpediente;
    const cardElement = document.getElementById(`card-${idExpediente}`);
    if (cardElement) {
      this.renderer.addClass(cardElement, 'card-hover');
    }
  }

  onMouseLeave(idExpediente: number) {
    if (this.expedienteHover === idExpediente) {
      this.expedienteHover = null;
      const cardElement = document.getElementById(`card-${idExpediente}`);
      if (cardElement) {
        this.renderer.removeClass(cardElement, 'card-hover');
      }
    }
  }

  buscar(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let resultados = [...this._expedientesCache];
    
    // Filtro por término de búsqueda
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase().trim();
      resultados = resultados.filter(expediente =>
        Object.values(expediente).some(
          (val: any) => typeof val === 'string' && val.toLowerCase().includes(termino)
        )
      ); // <-- faltaba cerrar esta función con paréntesis y punto y coma
    }
    
    // Filtro por estado
    if (this.filtroEstado) {
      resultados = resultados.filter(e => {
        const estadoExpediente = e.estado?.toLowerCase() || '';
        const estadoFiltro = this.filtroEstado.toLowerCase();
        return estadoExpediente.includes(estadoFiltro);
      });
    }
  
    // Filtro por fecha
    if (this.filtroFecha) {
      resultados = resultados.filter(e => {
        const fechaExpediente = e.fechaCreacion?.split('T')[0] || '';
        return fechaExpediente === this.fechaFiltro;
      });
    }
  
    // Filtro por abogado
    if (this.filtroAbogado) {
      const terminoAbogado = this.filtroAbogado.toLowerCase().trim();
      resultados = resultados.filter(e => 
        e.datosAbogado?.toLowerCase().includes(terminoAbogado)
      );
    }
    
    this.expedientesFiltrados = resultados;
  }
  

  // Agrega esto en tu componente
get fechaFiltro(): string {
  return this.filtroFecha ? new Date(this.filtroFecha).toISOString().split('T')[0] : '';
}

  private mapearExpedientes(expedientes: any[]): any[] {
    return expedientes.map(expediente => {
        let datosAbogado = { nombreEmpleado: '', aPEmpleado: '', aMEmpleado: '', licencia: '', telefono: '' };
        try {
            if (expediente.datosAbogado) {
                datosAbogado = typeof expediente.datosAbogado === 'string' ? 
                    JSON.parse(expediente.datosAbogado) : 
                    expediente.datosAbogado;
            }
        } catch (e) {
            console.error('Error al parsear datosAbogado:', e);
        }

        const datosAbogadoConcatenados = `${datosAbogado.nombreEmpleado || ''} ${datosAbogado.aPEmpleado || ''} ${datosAbogado.aMEmpleado || ''}`;

        let datosCliente = { nombreCliente: '', aPCliente: '', aMCliente: '', direccion: '', telefono: '', correo: '' };
        try {
            if (expediente.datosCliente) {
                datosCliente = typeof expediente.datosCliente === 'string' ? 
                    JSON.parse(expediente.datosCliente) : 
                    expediente.datosCliente;
            }
        } catch (e) {
            console.error('Error al parsear datosCliente:', e);
        }

        const datosClienteConcatenados = `${datosCliente.nombreCliente || ''} ${datosCliente.aPCliente || ''} ${datosCliente.aMCliente || ''}`;

        const fechaCreacion = expediente.fechaCreacion ? 
            new Date(expediente.fechaCreacion).toLocaleDateString() : 
            'No disponible';
            
        const ultimaActualizacion = expediente.ultimaActualizacion ? 
            new Date(expediente.ultimaActualizacion).toLocaleDateString() : 
            'No disponible';
            
        const proximaAudiencia = expediente.proximaAudiencia ? 
            new Date(expediente.proximaAudiencia).toLocaleDateString() : 
            'No programada';

        return {
            ...expediente,
            datosAbogado: datosAbogadoConcatenados,
            datosCliente: datosClienteConcatenados,
            fechaCreacion,
            ultimaActualizacion,
            proximaAudiencia,
            datosAbogadoRaw: datosAbogado,
            datosClienteRaw: datosCliente,
            audiencias: expediente.audiencias || []
        };
    });
  }

  private mostrarErrorCarga(): void {
    if (isPlatformBrowser(this.platformId)) {
      const container = document.querySelector('.expedientes-container');
      if (container) {
        const oldMessage = container.querySelector('.error-message');
        if (oldMessage) {
          this.renderer.removeChild(container, oldMessage);
        }

        const errorDiv = this.renderer.createElement('div');
        this.renderer.addClass(errorDiv, 'alert');
        this.renderer.addClass(errorDiv, 'alert-danger');
        this.renderer.addClass(errorDiv, 'error-message');
        this.renderer.addClass(errorDiv, 'mt-3');
        
        const errorContent = `
          <div class="d-flex align-items-center">
            <i class="fa fa-exclamation-triangle me-2"></i>
            <span>Error al cargar los expedientes. </span>
            <button class="btn btn-link p-0 ms-2" id="reintentarBtn">Reintentar</button>
          </div>
        `;
        
        this.renderer.setProperty(errorDiv, 'innerHTML', errorContent);
        this.renderer.appendChild(container, errorDiv);
        
        const reintentarBtn = errorDiv.querySelector('#reintentarBtn');
        if (reintentarBtn) {
          this.renderer.listen(reintentarBtn, 'click', () => this.cargarExpedientes());
        }
      }
    }
  }

  abrirModal(documentoBase64: string): void {
    if (!documentoBase64) {
      this.mostrarAlerta('El documento no está disponible.', 'warning');
      return;
    }
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${documentoBase64}`);
    this.modalService.open(this.pdfModal, { size: 'lg' });
  }

  async confirmarEliminacion(idExpediente: number): Promise<void> {
    const confirmado = await this.mostrarConfirmacion(
      '¿Estás seguro de eliminar este expediente?',
      'Esta acción no se puede deshacer.'
    );
    
    if (confirmado) {
      this.eliminarExpediente(idExpediente);
    }
  }

  private eliminarExpediente(idExpediente: number): void {
    this.eliminandoExpediente[idExpediente] = true;
    
    this.uploadFileService.eliminarExpediente(idExpediente.toString()).pipe(
      finalize(() => this.eliminandoExpediente[idExpediente] = false)
    ).subscribe({
      next: () => {
        this._expedientesCache = this._expedientesCache.filter(e => e.idExpediente !== idExpediente);
        this.expedientesFiltrados = this.expedientesFiltrados.filter(e => e.idExpediente !== idExpediente);
        this.mostrarAlerta('Expediente eliminado correctamente.', 'success');
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        this.mostrarAlerta('Error al eliminar el expediente.', 'danger');
      }
    });
  }

  programarProximaAudiencia(idExpediente: number): void {
    const modalRef = this.modalService.open(ModalActualizarAudienciaComponent);
    modalRef.componentInstance.idExpediente = idExpediente;
    
    modalRef.result.then((result) => {
      if (result?.fecha) {
        this.actualizarProximaAudiencia(idExpediente, result.fecha);
      }
    }).catch(() => {});
  }

  private actualizarProximaAudiencia(idExpediente: number, fecha: string): void {
    this.uploadFileService.actualizarProximaAudiencia(idExpediente.toString(), fecha).subscribe({
      next: () => {
        const expediente = this._expedientesCache.find(e => e.idExpediente === idExpediente);
        if (expediente) {
          expediente.proximaAudiencia = fecha;
          expediente.ultimaActualizacion = new Date().toISOString().split('T')[0];
          this.expedientesFiltrados = [...this._expedientesCache];
        }
        this.mostrarAlerta('Audiencia actualizada correctamente.', 'success');
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        this.mostrarAlerta('Error al programar la audiencia.', 'danger');
      }
    });
  }

  abrirModalAudiencia(expediente: any): void {
    this.expedienteSeleccionado = expediente;
    this.fechaAudiencia = expediente.proximaAudiencia || '';
    this.cargarAudiencias(expediente.idExpediente);
    this.modalService.open(this.audienciaModal, { size: 'lg' });
  }

  guardarAudiencia(): void {
    if (!this.fechaAudiencia) {
        this.mostrarAlerta('Por favor seleccione una fecha válida.', 'warning');
        return;
    }

    if (this.expedienteSeleccionado) {
        const audienciaData = {
            fechaHora: this.fechaAudiencia,
            tipoAudiencia: 'Audiencia Programada',
            sala: 'Sala por definir',
            observaciones: 'Audiencia programada desde el sistema'
        };

        this.uploadFileService.programarAudiencia(
            this.expedienteSeleccionado.idExpediente.toString(),
            audienciaData
        ).subscribe({
            next: (response) => {
                const index = this._expedientesCache.findIndex(
                    e => e.idExpediente === this.expedienteSeleccionado.idExpediente
                );
                
                if (index !== -1) {
                    this._expedientesCache[index] = {
                        ...this._expedientesCache[index],
                        ultimaActualizacion: new Date().toISOString(),
                        proximaAudiencia: this.fechaAudiencia,
                        audiencias: [
                            ...(this._expedientesCache[index].audiencias || []),
                            {
                                fechaHora: this.fechaAudiencia,
                                tipoAudiencia: audienciaData.tipoAudiencia,
                                sala: audienciaData.sala,
                                estado: 'Programada',
                                observaciones: audienciaData.observaciones
                            }
                        ]
                    };
                    
                    this.expedientesFiltrados = [...this._expedientesCache];
                }
                
                this.mostrarAlerta('Audiencia programada correctamente', 'success');
                this.modalService.dismissAll();
            },
            error: (error) => {
                console.error('Error al programar audiencia:', error);
                this.mostrarAlerta('Error al programar la audiencia', 'danger');
            }
        });
    }
  }

  private mostrarAlerta(mensaje: string, tipo: 'success'|'danger'|'warning'): void {
    const alertContainer = document.querySelector('.alert-container');
    if (alertContainer) {
      const alertDiv = this.renderer.createElement('div');
      this.renderer.addClass(alertDiv, 'alert');
      this.renderer.addClass(alertDiv, `alert-${tipo}`);
      this.renderer.addClass(alertDiv, 'alert-dismissible');
      this.renderer.addClass(alertDiv, 'fade');
      this.renderer.addClass(alertDiv, 'show');
      
      const alertContent = `
        <span>${mensaje}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      
      this.renderer.setProperty(alertDiv, 'innerHTML', alertContent);
      this.renderer.appendChild(alertContainer, alertDiv);
      
      setTimeout(() => {
        this.renderer.removeChild(alertContainer, alertDiv);
      }, 5000);
    }
  }
  
  limpiarFiltros() {
    this.filtroEstado = '';
    this.filtroFecha = '';
    this.filtroAbogado = '';
    this.terminoBusqueda = ''; // También limpiamos la búsqueda general
    this.aplicarFiltros();
  }


  private async mostrarConfirmacion(titulo: string, mensaje: string): Promise<boolean> {
    const confirmado = confirm(`${titulo}\n${mensaje}`);
    return Promise.resolve(confirmado);
  }
}
