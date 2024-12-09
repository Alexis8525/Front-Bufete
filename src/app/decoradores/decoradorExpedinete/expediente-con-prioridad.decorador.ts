import { ExpedienteComponent } from "./expediente.component";
import { ExpedienteDecoradorBase } from "./expediente.component";

export class ExpedienteConPrioridadDecorator extends ExpedienteDecoradorBase {
  private decoradoYaAplicado: boolean = false;

  constructor(componente: ExpedienteComponent) {
    super(componente);
  }

  override crearExpediente(): void {
    if (this.decoradoYaAplicado) {
      console.warn('Este decorador ya fue aplicado.');
      return;
    }
    (this.componente as any).expediente.estado = 'PrioridadAlta';
    console.log('Estado actualizado a PrioridadAlta');

    console.log('Aplicando decorador de prioridad');
    this.decoradoYaAplicado = true;
    super.crearExpediente(); // Llama al método original
  }
}
