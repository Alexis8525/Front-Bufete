export interface Nota {
    idNota?: number; // Opcional si es autogenerado
    titulo: string;
    descripcion: string;
    fechaCreacion?: string; // Opcional, se genera automáticamente
    ultimaActualizacion?: string; // Opcional
    idExpedienteFK?: number;
    idCitaFK?: number;
    tipoNota: string;
    estado: string;
  }
  