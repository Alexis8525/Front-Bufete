import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Nota } from '../../../models/notas';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-nota',
  templateUrl: './nueva-nota.component.html',
  styleUrls: ['./nueva-nota.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CrearNotaModalComponent {
  nuevaNota: Nota = {
    idNota: 0,
    titulo: '',
    descripcion: '',
    tipoNota: '',
    fechaCreacion: new Date().toISOString(),
    ultimaActualizacion: new Date().toISOString(),
    estado: 'activa',
    idExpedienteFK: 0, // Se llenará automáticamente
    idCitaFK: 0,       // Se llenará automáticamente
  };

  @Output() notaCreada = new EventEmitter<Nota>();
  @Input() idExpedienteFK!: number; // ID del expediente
  @Input() idCitaFK!: number;      // ID de la cita

  ngOnInit(): void {
    // Asignar automáticamente los valores de cita y expediente
    this.nuevaNota.idExpedienteFK = this.idExpedienteFK;
    this.nuevaNota.idCitaFK = this.idCitaFK;
  }

  constructor(public activeModal: NgbActiveModal) {}

  crearNota() {
    this.notaCreada.emit(this.nuevaNota); // Emitir la nota con todos los datos
    this.activeModal.close(); // Cerrar el modal
  }
}
