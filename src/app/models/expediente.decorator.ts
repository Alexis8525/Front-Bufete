// expediente.decorator.ts

// Define la interfaz ExpedienteComponent
export interface ExpedienteComponent {
    getDetalle(): string;
}

// Clase abstracta que implementa la interfaz
export abstract class ExpedienteDecorator implements ExpedienteComponent {
    abstract getDetalle(): string;
}

// Clase para expedientes prioritarios
export class PrioritarioExpediente extends ExpedienteDecorator {
    constructor(private expediente: ExpedienteComponent) {
        super();
    }

    override getDetalle(): string {
        return this.expediente.getDetalle() + ' - Este expediente es prioritario';
    }
}

// Clase para expedientes archivados
export class ArchivadoExpediente extends ExpedienteDecorator {
    constructor(private expediente: ExpedienteComponent) {
        super();
    }

    override getDetalle(): string {
        return this.expediente.getDetalle() + ' - Este expediente está archivado';
    }
}

// Clase base (puede ser un ejemplo)
export class ExpedienteBase implements ExpedienteComponent {
    getDetalle(): string {
        return 'Expediente básico';
    }
}
