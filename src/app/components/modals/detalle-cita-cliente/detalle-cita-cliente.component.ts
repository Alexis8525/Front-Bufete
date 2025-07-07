import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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

  @Input() cita!: FechaCita & { horario: string }; // Cita con horario combinado
  @Output() onCancelarCita = new EventEmitter<number>(); // Evento para emitir el ID de la cita a cancelar

  constructor(public activeModal: NgbActiveModal) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cita']) {
      console.log("Cita recibida en el modal:", this.cita); // Verifica si el objeto cita está disponible al cambiar
    }
  }

  closeModal(): void {
    console.log("Cerrando modal"); // Confirmación de cierre del modal
    this.activeModal.close();
  }

  cancelarCita(): void {
    if (this.cita?.idCita) {
      console.log("Emitiendo evento de cancelación para la cita con ID:", this.cita.idCita); // Log del ID de la cita cancelada
      this.onCancelarCita.emit(this.cita.idCita); // Emitir el ID de la cita a cancelar
      this.closeModal(); // Cerrar el modal después de emitir el evento
    } else {
      console.error("No se encontró el ID de la cita para cancelar"); // Log de error si no se encuentra el ID
    }
  }
}
