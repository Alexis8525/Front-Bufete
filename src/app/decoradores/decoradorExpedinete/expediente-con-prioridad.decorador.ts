import { ExpedienteComponent } from "./expediente.component";
import { ExpedienteDecoradorBase } from "./expediente.component";

export class ExpedienteConPrioridadDecorator extends ExpedienteDecoradorBase {
  constructor(componente: ExpedienteComponent) {
    super(componente);
  }

  override crearExpediente(): void {
    // Modificar el estado del expediente dentro del decorador
    (this.componente as any).expediente.estado = 'Prioridad Alta';
    console.log('Estado actualizado a Prioridad Alta en el decorador.');

    alert('Expediente a sido Prioridad Alta.');
    
    super.crearExpediente(); // Continuar con el flujo del componente decorado
  }
}
