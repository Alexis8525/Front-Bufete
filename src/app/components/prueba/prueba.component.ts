import { Component } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [
    BarraLateralComponent
  ],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {

}
