import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FechaCita } from '../../../models/fechas-citas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-cita-cliente',
  templateUrl: './detalle-cita-cliente.component.html',
  styleUrls: ['./detalle-cita-cliente.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DetalleCitaClienteComponent implements OnChanges {

  @Input() cita!: FechaCita;  // Define cita con el tipo FechaCita para recibir el objeto completo

  constructor(public activeModal: NgbActiveModal) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cita']) {
      console.log("Cita recibida en ngOnChanges:", this.cita);  // Verifica si el objeto cita está disponible al cambiar
    }
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
