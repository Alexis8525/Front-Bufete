//Archivo expediente-archivado.decorador.ts
import { ExpedienteComponent } from "./expediente.component";
import { ExpedienteDecoradorBase } from "./expediente.component";

export class ExpedienteArchivadoDecorator extends ExpedienteDecoradorBase {
    constructor(componente: ExpedienteComponent) {
      super(componente);
    }
  
    override crearExpediente(): void {
        console.trace('Creando expediente archivado');
        if (this.componente === this) {
            throw new Error('Decorador está decorando a sí mismo.');
        }
        this.componente.crearExpediente();
    }
  }