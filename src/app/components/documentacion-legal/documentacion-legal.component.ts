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
  styleUrls: ['./documentacion-legal.component.css'],
})
export class DocumentacionLegalComponent {
  @Input() expedientes: any[] = [];
  @Input() tiposDocumentos: any[] = [];

  archivos: { documentoBase64: string; idTipoDocumentoFK: number }[] = [];
  expedienteSeleccionado: any = null;
  tipoDocumentoSeleccionado: string = '';

  constructor(private http: HttpClient, private documentosService: DocumentosService) {}

  ngOnInit() {
    this.cargarExpedientes();
    this.cargarTiposDocumentos();
  }

  cargarExpedientes() {
    this.documentosService.obtenerExpedientes().subscribe({
      next: (expedientes) => (this.expedientes = expedientes),
      error: (err) => console.error('Error al cargar expedientes:', err),
    });
  }

  cargarTiposDocumentos() {
    this.documentosService.obtenerTiposDocumentos().subscribe({
      next: (tipos) => (this.tiposDocumentos = tipos),
      error: (err) => console.error('Error al cargar tipos de documentos:', err),
    });
  }

  onFileSelected(event: Event, tipoDocumento: string) {
    if (!tipoDocumento) {
      alert('Por favor, selecciona un tipo de documento antes de subir un archivo.');
      return;
    }
  
    const idTipoDocumentoFK = this.obtenerIdTipoDocumento(tipoDocumento);
    if (!idTipoDocumentoFK) {
      alert(`El tipo de documento "${tipoDocumento}" no es válido.`);
      return;
    }
  
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.convertFileToBase64(file).then((base64) => {
        this.archivos.push({ documentoBase64: base64, idTipoDocumentoFK });
        input.value = ''; // Limpiar el input de archivo
  
        // Mostrar confirmación para agregar otro archivo
        const continuar = confirm('Archivo añadido. ¿Deseas subir otro archivo con un nuevo tipo de documento?');
        if (continuar) {
          this.tipoDocumentoSeleccionado = ''; // Resetear el selector de tipo de documento
        }
      });
    }
  }
  

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Eliminar el prefijo antes de resolver
        const base64SinPrefijo = base64.split(',')[1]; 
        resolve(base64SinPrefijo);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  

  obtenerIdTipoDocumento(tipoDocumento: string): number {
    const tipo = this.tiposDocumentos.find((doc) => doc.tipoDocumento === tipoDocumento);
    return tipo?.idTipoDocumento || 0;
  }

  subirDocumentos() {
    if (!this.expedienteSeleccionado) {
      alert('Por favor, selecciona un expediente antes de continuar.');
      return;
    }
  
    console.log('Expediente seleccionado:', this.expedienteSeleccionado); // Validar aquí
    const idExpedienteFK = this.expedienteSeleccionado.idExpediente; // Cambio realizado aquí
  
    if (!idExpedienteFK) {
      alert('El expediente seleccionado no tiene un ID válido.');
      return;
    }
  
    const payload = { idExpedienteFK, documentos: this.archivos };
    console.log('Payload a enviar:', JSON.stringify(payload, null, 2)); // Validar aquí
  
    this.documentosService.subirDocumentos(idExpedienteFK, this.archivos).subscribe({
      next: (response) => {
        console.log('Documentos subidos correctamente:', response);
        alert('¡Documentos subidos exitosamente!');
        this.resetearFormulario();
      },
      error: (err) => console.error('Error al subir los documentos:', err),
    });
  }
  
  

  resetearFormulario() {
    this.archivos = [];
    this.expedienteSeleccionado = null;
    this.tipoDocumentoSeleccionado = '';
  }
}
