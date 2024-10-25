import { Component } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component'; 

@Component({
  selector: 'app-solicitud-cita',
  standalone: true,
  imports: [
    BarraLateralComponent,
  ],
  templateUrl: './solicitud-cita.component.html',
  styleUrl: './solicitud-cita.component.css'
})
export class SolicitudCitaComponent {

}
