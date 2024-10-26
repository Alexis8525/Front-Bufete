import { Component } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-gestion-cita',
  standalone: true,
  imports: [
    BarraLateralComponent,
  ],
  templateUrl: './gestion-cita.component.html',
  styleUrl: './gestion-cita.component.css'
})
export class GestionCitaComponent {

}
