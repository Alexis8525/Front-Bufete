import { ExpedienteComponent } from "./expediente.component";
import { ExpedienteDecoradorBase } from "./expediente.component";

export class ExpedienteArchivadoDecorator extends ExpedienteDecoradorBase {
    constructor(componente: ExpedienteComponent) {
        if (componente instanceof ExpedienteArchivadoDecorator) {
            throw new Error('El componente ya está decorado como "archivado".');
        }
        super(componente);
    }

    override crearExpediente(): void {
        console.trace('Creando expediente archivado');
        this.componente.crearExpediente();
    }
}
