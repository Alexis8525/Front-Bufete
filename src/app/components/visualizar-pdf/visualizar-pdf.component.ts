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
  styleUrls: ['./visualizar-pdf.component.scss']
})
export class VisualizarPdfComponent implements OnInit {
  expedientes: any[] = [];

  constructor(
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadExpedientes();  // Llamamos a loadExpedientes sin necesidad de idExpediente
    }
  }
  
  loadExpedientes(): void {
    this.uploadFileService.getExpedienteCompleto().subscribe(
      (response: any[]) => {
        this.expedientes = response.map((expediente: any) => {
          return {
            ...expediente,
            documentos: expediente.documentos || []  // Asegura que documentos esté definido
          };
        });
      },
      (error: any) => {
        console.error('Error al obtener los expedientes:', error);
      }
    );
  }

  visualizarDocumento(documentoBase64: string): void {
    if (documentoBase64 && documentoBase64.startsWith('JVBERi0xLjQK')) {
      const pdfWindow = window.open('');
      const iframe = document.createElement('iframe');
      iframe.src = `data:application/pdf;base64,${documentoBase64}`;
      iframe.width = '100%';
      iframe.height = '600px';
      pdfWindow?.document.body.appendChild(iframe);
    } else {
      console.error('Documento Base64 inválido o no soportado');
    }
  }
}
