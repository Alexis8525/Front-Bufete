import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var paypal: any;

@Component({
  selector: 'app-gestion-pago',
  standalone: true,
  imports: [FormsModule],  
  templateUrl: './gestion-pago.component.html',
  styleUrl: './gestion-pago.component.css'
})
export class GestionPagoComponent implements OnInit {
    @ViewChild('paypal',{static:true}) paypalElement!: ElementRef;

    cantidadPago: number = 0;
    ngOnInit(): void {
        paypal.Buttons({ 
          createOrder: (data : any, actions : any) => {
            return actions.order.create({
              intent:'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    currency_code: 'MXN',
                    value: this.cantidadPago.toString() 
                  }
                }
              ],
              application_context:{
                bran_name:'Despacho juridico',
                landing_page:'NO_PREFERENCE',
                user_action: 'PAY_NOW'
              }
            });
          },
          onApprove: async (data : any, actions : any) => {
            const order = await actions.order.capture();
            console.log('Order completed!', order);
          },
          onError: (err : any) => {
            console.error('Error:', err);
          }
        }) .render(this.paypalElement.nativeElement);
    }
  
}

