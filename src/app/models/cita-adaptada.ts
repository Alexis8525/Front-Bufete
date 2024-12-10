export interface CitaAdaptada {
    idCita: number;
    cliente?: string; // Visible para abogados y secretarias
    abogado?: string; // Visible para clientes y secretarias
    horaInicio: string;
    horaFinal: string;
    nombreServicio: string;
    motivo: string;
    fechaCita: string; // Siempre necesario para filtrado
    estadoCita: string; // Siempre necesario para filtrado
  }
  