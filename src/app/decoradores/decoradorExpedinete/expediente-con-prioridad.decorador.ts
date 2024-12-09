//Archivo expediente-con-prioridad.decorador.ts
import { ExpedienteComponent } from "./expediente.component";
import { ExpedienteDecoradorBase } from "./expediente.component";

export class ExpedienteConPrioridadDecorator extends ExpedienteDecoradorBase {
    constructor(componente: ExpedienteComponent) {
      super(componente);
    }
  
    override crearExpediente(): void {
      console.log('Creando expediente con prioridad');
      if (this.componente === this) {
        throw new Error('Decorador está decorando a sí mismo.');
      }
      this.componente.crearExpediente();
    }
}
  