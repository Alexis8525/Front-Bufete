import { Component, Input, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Expediente } from '../../models/expediente';
import { ExpedienteService } from '../../services/expediente.service';
import { DocumentosService } from '../../services/documentos.service';
import { ActivatedRoute } from '@angular/router';
import { CitaExpedienteService } from '../../services/cita-expediente.service';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    FormsModule,
    CommonModule
  ],
})
export class ExpedienteComponent implements OnInit {
  @Input() expedientes: any[] = [];
  @Input() categoriasDocumentos: any[] = [];
  subcategoriasDocumentos: any[] = [];

  citas: any[] = []; // Lista de citas
  loading: boolean = true; // Indicador de carga
  errorMessage: string | null = null; // Mensaje de error


  archivos: { documentoBase64: string; idCategoriaFK: number;  idSubCategoriaFK: number }[] = [];
  expedienteSeleccionado: any = null;
  categoriaSeleccionada: any = null;
  subCategoriaSeleccionada: any = null;

  idExpediente: number = 0; // Número de expediente a buscar
  expediente: Expediente | null = null; // Información del expediente
  demandantes: any[] = []; // Lista de demandantes
  demandados: any[] = []; // Lista de demandados
  terceros: any[] = []; // Lista de terceros relacionados

  constructor(
    private activatedRoute: ActivatedRoute,
    private expedienteService: ExpedienteService,
    private documentosService: DocumentosService,
    private citaExpedienteService: CitaExpedienteService
  ) { }

  ngOnInit() {
    // Obtener el ID del expediente desde la ruta
    this.idExpediente = +this.activatedRoute.snapshot.paramMap.get('idExpediente')!;
    console.log('ID del Expediente:', this.idExpediente);
  
    // Cargar la información del expediente y las categorías
    this.getInformacionGeneral();
    this.cargarExpedientes();
    this.cargarCategoriasDocumentos(); // Cargar categorías al iniciar
    this.cargarCitas(this.idExpediente);
  }

  cargarCitas(idExpediente: number) {
    this.citaExpedienteService.getCitasPorExpediente(idExpediente).subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
        console.log('Citas cargadas:', this.citas);
      },
      error: (err) => {
        console.error('Error al cargar citas:', err);
        this.errorMessage = 'No se pudieron cargar las citas.';
        this.loading = false;
      },
    });
  }
  

  getInformacionGeneral() {
    this.expedienteService.getInformacionGeneral(this.idExpediente).subscribe(
      (data) => {
        // Formatear la fecha antes de asignarla
        if (data.fechaApertura) {
          data.fechaApertura = this.formatearFecha(data.fechaApertura);
        }

        // Formatear el estado antes de asignarlo
        if (data.estado) {
          data.estado = this.formatearEstado(data.estado);
        }

        this.expediente = data;
        console.log('Datos del expediente cargados:', this.expediente);
      },
      (error) => {
        console.error('Error al cargar expediente:', error);
        this.expediente = null;
      }
    );
  }

  // Obtener las partes relacionadas del expediente
  getPartesRelacionadas() {
    this.expedienteService.getPartesPorExpediente(this.idExpediente).subscribe(
      (data) => {
        this.demandantes = data.filter((parte) => parte.tipoParte === 'Demandante');
        this.demandados = data.filter((parte) => parte.tipoParte === 'Demandado');
        this.terceros = data.filter((parte) => parte.tipoParte === 'Tercero Relacionado');
        console.log('Demandantes:', this.demandantes);
        console.log('Demandados:', this.demandados);
        console.log('Terceros Relacionados:', this.terceros);
      },
      (error) => {
        console.error('Error al cargar partes relacionadas:', error);
      }
    );
  }

  // Método para formatear la fecha
  formatearFecha(fecha: string): string {
    return fecha.split('T')[0]; // Extrae solo la parte de la fecha (YYYY-MM-DD)
  }

  // Método para formatear el estado
  formatearEstado(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'abierto':
        return 'Abierto';
      case 'proceso':
        return 'En Proceso';
      case 'cerrado':
        return 'Cerrado';
      default:
        return estado; // Por si acaso
    }
  }
  cargarExpedientes() {
    this.documentosService.obtenerExpedientes().subscribe({
      next: (expedientes) => (this.expedientes = expedientes),
      error: (err) => console.error('Error al cargar expedientes:', err),
    });
  }


  cargarCategoriasDocumentos() {
    this.documentosService.obtenerCategoriasDocumentos().subscribe({
      next: (categorias) => (this.categoriasDocumentos = categorias),
      error: (err) => console.error('Error al cargar categorías de documentos:', err),
    });
  }
  

  onCategoriaChange() {
    this.subCategoriaSeleccionada = null;
    this.documentosService.obtenerSubCategorias(this.categoriaSeleccionada.idCategoria).subscribe({
      next: (subcategorias) => (this.subcategoriasDocumentos = subcategorias),
      error: (err) => console.error('Error al cargar subcategorías:', err),
    });
  }
  
  onFileSelected(event: Event) {
    if (!this.subCategoriaSeleccionada || !this.categoriaSeleccionada) {
      alert('Por favor, selecciona una subcategoría y categoría antes de subir un archivo.');
      return;
    }
  
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.convertFileToBase64(file).then((base64) => {
        this.archivos.push({
          documentoBase64: base64,
          idCategoriaFK: this.categoriaSeleccionada.idCategoria, // Aquí agregas idCategoriaFK
          idSubCategoriaFK: this.subCategoriaSeleccionada.idSubCategoria,
        });
        
        input.value = '';
  
        // Mostrar la alerta después de agregar el archivo
        const respuesta = confirm('¿Quieres subir otro documento?');
        if (respuesta) {
          // Limpiar categoría y subcategoría si el usuario acepta
          this.categoriaSeleccionada = null;
          this.subCategoriaSeleccionada = null;
        }
      });
    }
  }
  

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        console.log('Contenido Base64:', base64);
        resolve(base64.split(',')[1]); // Asegúrate de dividir correctamente
      };
      reader.onerror = (error) => {
        console.error('Error al convertir archivo a Base64:', error);
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  

  subirDocumentos() {
    if (!this.expedienteSeleccionado) {
      alert('Por favor, selecciona un expediente antes de continuar.');
      return;
    }
  
    const idExpedienteFK = this.expedienteSeleccionado.idExpediente;
    const idCategoriaFK = this.categoriaSeleccionada.idCategoria;
    const idSubCategoriaFK = this.subCategoriaSeleccionada.idSubCategoria;
    if (!idExpedienteFK) {
      alert('El expediente seleccionado no tiene un ID válido.');
      return;
    }
  
    this.documentosService.subirDocumentos1(idExpedienteFK, this.archivos, idCategoriaFK, idSubCategoriaFK).subscribe({
      next: (response) => {
        alert('¡Documentos subidos exitosamente!');
        this.resetearFormulario();
      },
      error: (err) => {
        console.error('Error al subir los documentos:', err);
        alert('Error al subir los documentos. Por favor, intenta nuevamente.');
      },
    });
  }
  
  
  

  resetearFormulario() {
    this.archivos = [];
    this.expedienteSeleccionado = null;
    this.categoriaSeleccionada = null;
    this.subCategoriaSeleccionada = null;
    this.subcategoriasDocumentos = [];
  }
}
