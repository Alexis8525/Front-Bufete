// models/citas.ts
export interface Cita {
    idCita: number;                   // ID único de la cita
    motivo: string;                   // Motivo de la cita
    estadoCita: string;               // Estado de la cita
    nombreCliente: string;             // Nombre del cliente
    aPCliente: string;                // Apellido paterno del cliente
    aMCliente: string;                // Apellido materno del cliente
    telefonoCliente: string;          // Teléfono del cliente
    fechaAgenda: string;              // Fecha de la agenda
    horaInicio: string;               // Hora de inicio
    horaFinal: string;                // Hora final
    nombreServicio: string;           // Nombre del servicio
    descripcion: string;              // Descripción del servicio
    costo: number;                    // Costo del servicio
}
