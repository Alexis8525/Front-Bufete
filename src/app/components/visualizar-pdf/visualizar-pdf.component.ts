import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-visualizar-pdf',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './visualizar-pdf.component.html',
  styleUrls: ['./visualizar-pdf.component.css']
})
export class VisualizarPdfComponent implements OnInit {
  expediente: any = null;
  documentos: any[] = [];

  constructor(
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    console.log('Iniciando ngOnInit');
    this.loadExpedienteCompleto(4);
  }
  
  loadExpedienteCompleto(idExpediente: number): void {
    console.log('Cargando expediente con id:', idExpediente);
    this.uploadFileService.getExpedienteCompleto(idExpediente).subscribe(
      (response: any[]) => {
        console.log('Respuesta recibida:', response);
        
        if (response && response.length > 0) {
          this.expediente = response[0];
          this.documentos = this.expediente.documentos || [];
          console.log('Expediente cargado:', this.expediente);
          console.log('Documentos cargados:', this.documentos);
        } else {
          console.error('No se encontró el expediente');
        }
      },
      (error) => {
        console.error('Error al obtener el expediente completo:', error);
      }
    );
  }
  
  

  visualizarDocumento(documentoBase64: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Verificar si el Base64 tiene el encabezado correcto
      if (documentoBase64 && documentoBase64.startsWith('JVBERi0xLjQK')) {
        // Crear una ventana nueva para visualizar el PDF
        const pdfWindow = window.open('');
        const iframe = document.createElement('iframe');
        iframe.src = `data:application/pdf;base64,${documentoBase64}`; // Mostrar el Base64 en el iframe
        iframe.width = '100%';
        iframe.height = '600px';
        pdfWindow?.document.body.appendChild(iframe);  // Insertar el iframe en la ventana nueva
      } else {
        console.error('Documento Base64 inválido o no soportado');
      }
    } else {
      console.error('El código no se está ejecutando en el navegador');
    }
  } 
}
