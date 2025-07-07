export interface Expediente {
    idExpediente?: number;
    numeroExpediente: string;
    estado: string;
    descripcion: string;
    nombreExpediente: string;
    idClienteFK: number;
    idEmpleadoFK?: number;
    fechaApertura?: string; 

  }
  