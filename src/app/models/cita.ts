export interface Cita {
    motivo: string;          // Motivo de la cita
    estado: string;      // Estado de la cita (por ejemplo, "pendiente", "confirmada", etc.)
    idClienteFK: number;     // ID del cliente que solicita la cita
    idAgendaFK: number;      // ID de la agenda del servicio
    idAbogado: number;       // ID del abogado asignado a la cita
    fechaAgenda: string;     // Fecha de la cita
    horaInicio: string;      // Hora de inicio de la cita
    horaFinal: string;       // Hora de finalización de la cita
  }
  