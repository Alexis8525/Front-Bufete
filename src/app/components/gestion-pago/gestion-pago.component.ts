import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; //SE INSTALA CON npm install sweetalert2
import { jsPDF } from "jspdf"; // SE INSTALA CON npm install jspdf --save
import html2canvas from "html2canvas";
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';

declare var paypal: any;

@Component({
  selector: 'app-gestion-pago',
  standalone: true,
  imports: [FormsModule,
    BarraLateralComponent],
  templateUrl: './gestion-pago.component.html',
  styleUrl: './gestion-pago.component.css'
})
export class GestionPagoComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  //METODO PARA IMPRIMIR PDF DE REFRENCIA DE PAGO
  imprimirReferencia() {
    const input = document.getElementById('realizarPago');

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();

        // Dimensiones del PDF en mm
        const pageWidth = 210;  // Ancho de la página A4 en mm
        const pageHeight = 297; // Altura de la página A4 en mm      
        const margin = 20; // Margenes      
        const imgWidth = pageWidth - (2 * margin); // Ancho de la imagen = Ancho de la página - márgenes laterales
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener relación de aspecto de la imagen      
        let positionX = margin; // Margen izquierdo
        let positionY = margin; // Margen superior  
        doc.addImage(imgData, 'PNG', positionX, positionY, imgWidth, imgHeight);
        doc.save('Referencia_de_pago.pdf');
      });
    }
  }

  //METODO PARA IMPRIMIR PDF DE EXPEDIENTE DE PAGOS 
  imprimirExpediente() {
    const input = document.getElementById('formPagos');

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();

        // Dimensiones del PDF en mm
        const pageWidth = 210;  // Ancho de la página A4 en mm
        const pageHeight = 297; // Altura de la página A4 en mm      
        const margin = 20; // Margenes      
        const imgWidth = pageWidth - (2 * margin); // Ancho de la imagen = Ancho de la página - márgenes laterales
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Mantener relación de aspecto de la imagen      
        let positionX = margin; // Margen izquierdo
        let positionY = margin; // Margen superior  
        doc.addImage(imgData, 'PNG', positionX, positionY, imgWidth, imgHeight);
        doc.save('Expediente_de_pago.pdf');
      });
    }
  }

  cantidadPago: number = 0;
  ngOnInit(): void {

    //PAYPAL
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'MXN',
                value: this.cantidadPago.toString()
              }
            }
          ],
          application_context: {
            bran_name: 'Despacho juridico',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW'
          }
        });
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log('Order completed!', order);
        Swal.fire({
          title: '¡Pago realizado con éxito!',
          text: 'Gracias por tu compra. Su saldo ahora es: $5000',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 5000,
          timerProgressBar: true,
        });
      },
      onError: (err: any) => {
        console.error('Error:', err);
      }
    }).render(this.paypalElement.nativeElement);

  }

}

