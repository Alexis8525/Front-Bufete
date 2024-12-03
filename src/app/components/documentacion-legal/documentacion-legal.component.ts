import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosService } from '../../services/documentos.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documentacion-legal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documentacion-legal.component.html',
  styleUrls: ['./documentacion-legal.component.css']
})
export class DocumentacionLegalComponent {
  @Input() expedientes: any[] = []; // Aquí guardamos los expedientes disponibles
  @Input() tiposDocumentos: any[] = []; // Aquí guardamos los tipos de documentos disponibles

  archivos: { [key: string]: string | null } = {}; // Archivos cargados en base64
  expedienteSeleccionado: any = null; // Expediente seleccionado
  tiposDocumentosPadre: any[] = []; // Tipos de documentos padres
  tiposDocumentosHijos: any[] = []; // Tipos de documentos hijos
  tipoDocumentoPadreSeleccionado: number | null = null;
  tipoDocumentoHijoSeleccionado: number | null = null;
  archivoSubido: boolean = false; // Indica si se ha subido un archivo

  constructor(private http: HttpClient, private documentosService: DocumentosService) {}

  ngOnInit() {
    this.cargarExpedientes();
    this.cargarTiposDocumentos();
  }

  onExpedienteSeleccionado() {
    // Cargar los tipos de documentos padres solo si el expediente ha sido seleccionado
    this.cargarTiposDocumentosPadre();
  }

  // Método para cargar los tipos de documentos padres
  cargarTiposDocumentosPadre() {
    // Filtrar los tipos de documentos donde 'idPadre' es null
    this.tiposDocumentosPadre = this.tiposDocumentos.filter(doc => doc.idPadre === null);
    console.log(this.tiposDocumentosPadre)
  }

  // Método que se ejecuta cuando se selecciona un tipo de documento padre
  // Método que se ejecuta cuando se selecciona un tipo de documento padre
onTipoDocumentoPadreSeleccionado() {
  if (this.tipoDocumentoPadreSeleccionado != null) {
    // Obtener los documentos hijos basados en el padre seleccionado
    this.tiposDocumentosHijos = this.tiposDocumentos.filter(doc => doc.idPadre === this.tipoDocumentoPadreSeleccionado);
    console.log(this.tiposDocumentosHijos);
  }
}


  // Método para cargar los expedientes disponibles
  cargarExpedientes() {
    this.documentosService.obtenerExpedientes().subscribe({
      next: (expedientes) => {
        this.expedientes = expedientes;
      },
      error: (err) => console.error('Error al cargar expedientes:', err)
    });
  }

  // Método para cargar los tipos de documentos disponibles
  cargarTiposDocumentos() {
    this.documentosService.obtenerTiposDocumentos().subscribe({
      next: (tipos) => {
        this.tiposDocumentos = tipos;
        // Filtrar los tipos de documentos padres
        this.tiposDocumentosPadre = this.tiposDocumentos.filter(doc => doc.idPadre === null);
      },
      error: (err) => console.error('Error al cargar tipos de documentos:', err)
    });
  }

  // Cuando se selecciona un archivo para subir
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.convertFileToBase64(file).then(base64 => {
        this.archivos['CURP'] = base64; // Asumiendo que el tipo de documento es CURP
      });
    }
  }

  // Convertir el archivo a Base64
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Subir los documentos al backend
  subirDocumentos() {
    if (!this.expedienteSeleccionado) {
      console.error('No se ha seleccionado un expediente');
      return;
    }
  
    const documentos = Object.keys(this.archivos).map((tipoDocumento) => ({
      documentoBase64: this.archivos[tipoDocumento] || '',
      idTipoDocumentoFK: this.obtenerIdTipoDocumento(tipoDocumento),
    }));
  
    if (documentos.some(doc => !doc.documentoBase64)) {
      console.error('Todos los documentos deben estar seleccionados');
      return;
    }
  
    this.documentosService.subirDocumentos(this.expedienteSeleccionado.id, documentos).subscribe({
      next: (response: any) => {
        console.log('Documentos subidos correctamente:', response);
        this.archivoSubido = false;
      },
      error: (err: any) => {
        console.error('Error al subir los documentos:', err);
      }
    });
  }

  // Obtiene el ID de tipo de documento basado en el nombre
  obtenerIdTipoDocumento(tipoDocumento: string): number {
    const tipoDocumentoIds: { [key: string]: number } = {
      'CURP': 1,
      'Curriculum Vitae': 2,
      'Comprobante de Domicilio': 3,
      'Número de Seguridad Social (IMSS)': 4,
      'Identificación Oficial': 5
    };
    return tipoDocumentoIds[tipoDocumento] || 0;
  }

  // Resetear el formulario para subir otro archivo
  resetearFormulario() {
    this.archivos = {};
    this.tipoDocumentoHijoSeleccionado = null;
    this.archivoSubido = false;
  }
}
