import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Nota } from '../../../models/notas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ver-notas-modal',
  templateUrl: './ver-notas.component.html',
  styleUrls: ['./ver-notas.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class VerNotasModalComponent {
  @Input() notas: Nota[] = []; 
  constructor(public activeModal: NgbActiveModal) {}

  cerrarModal(): void {
    this.activeModal.close();
  }
}
