import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-actualizar-audiencia',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Programar Próxima Audiencia</h4>
      <button type="button" class="close" aria-label="Close" (click)="dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="fechaAudiencia">Fecha de la próxima audiencia</label>
        <input type="date" class="form-control" id="fechaAudiencia" 
               [(ngModel)]="fecha" required>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="dismiss()">Cancelar</button>
      <button type="button" class="btn btn-primary" (click)="save()" 
              [disabled]="!fecha">Guardar</button>
    </div>
  `,
  styleUrls: ['./modal-actualizar-audiencia.component.scss']
})
export class ModalActualizarAudienciaComponent {
  fecha: string = '';
  idExpediente: number = 0;

  constructor(public activeModal: NgbActiveModal) {}

  save(): void {
    this.activeModal.close({ fecha: this.fecha });
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
