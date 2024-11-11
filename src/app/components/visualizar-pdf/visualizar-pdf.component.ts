import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PdfViewerService } from '../../services/pdf-viewer.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-visualizar-pdf',
  templateUrl: './visualizar-pdf.component.html',
  styleUrls: ['./visualizar-pdf.component.css']
})
export class VisualizarPdfComponent implements OnInit {
  documentoBase64: string = '';
  tipoDocumento: string = '';
  pdfUrl: string = '';

  constructor(
    private http: HttpClient,
    private pdfViewerService: PdfViewerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadPdf(8);
  }

  loadPdf(id: number): void {
    this.pdfViewerService.getPdfDocument(id).subscribe(
      (response: any) => {
        if (response && response.documentoBase64) {
          this.documentoBase64 = response.documentoBase64;
          this.visualizarDocumento();
        } else {
          console.error('No se recibió un archivo PDF en Base64:', response);
        }
        console.log(this.documentoBase64)
      },
      (error) => {
        console.error('Error al obtener el PDF:', error);
      }
    );
  }

  visualizarDocumento(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pdfWindow = window.open('');
      const pdfData = this.documentoBase64;
      const iframe = document.createElement('iframe');
      iframe.src = `data:application/pdf;base64,${pdfData}`;
      iframe.width = '100%';
      iframe.height = '600px';
      pdfWindow?.document.body.appendChild(iframe);
    } else {
      console.error('El código no se está ejecutando en el navegador');
    }
  }
}
