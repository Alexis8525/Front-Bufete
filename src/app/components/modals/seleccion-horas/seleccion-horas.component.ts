import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seleccion-horas',
  templateUrl: './seleccion-horas.component.html',
  styleUrls: ['./seleccion-horas.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class SeleccionHorasComponent {
  @Input() selectedAbogado!: string; 
  horasDisponibles: string[] = [];
  horasSeleccionadas: { [key: string]: boolean } = {};

  constructor(public activeModal: NgbActiveModal) {
    this.generarHorasDisponibles();
  }

  generarHorasDisponibles(): void {
    const horas: string[] = [];
    for (let i = 9; i < 19; i++) {
      const inicio = `${i.toString().padStart(2, '0')}:00`;
      const fin = `${(i + 1).toString().padStart(2, '0')}:00`;
      const horaCompleta = `${inicio} - ${fin}`;
      horas.push(horaCompleta);
      
      // Inicializa horasSeleccionadas con todas las horas en true
      this.horasSeleccionadas[horaCompleta] = true;
    }
    this.horasDisponibles = horas;
    console.log('Horas generadas:', this.horasDisponibles);
  }

  guardarHoras(): void {
    const horasGuardadas = Object.keys(this.horasSeleccionadas).filter(hora => this.horasSeleccionadas[hora]);
    console.log(`Horas de ${this.selectedAbogado}: ${horasGuardadas.join(', ')}`);
    this.activeModal.close(horasGuardadas);
  }
}
