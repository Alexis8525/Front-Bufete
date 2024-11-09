export interface FechaCita {
    idCita: number;                     // ID de la cita
    motivo: string;                     // Motivo de la cita
    estadoCita: string;                 // Estado actual de la cita (e.g., programada, cancelada)
    nombreCliente: string;              // Nombre del cliente
    aPCliente: string;                  // Apellido paterno del cliente
    aMCliente: string;                  // Apellido materno del cliente
    fechaCita: string;                  // Fecha de la cita en formato ISO string
    horaInicio: string;                 // Hora de inicio en formato ISO string
    horaFinal: string;                  // Hora de finalización en formato ISO string
    abogadoNombre: string;              // Nombre del abogado asignado
    abogadoApellidoPaterno: string;     // Apellido paterno del abogado
    abogadoApellidoMaterno: string;     // Apellido materno del abogado
    nombreServicio: string;             // Nombre del servicio
    descripcionServicio: string;        // Descripción del servicio
    costoServicio: number;   
    fechaAgenda: string;           // Costo del servicio
    idServicioFK: number;
}