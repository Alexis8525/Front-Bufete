export interface Agenda {
    idAgenda: number; 
    horaInicio: string; 
    horaFinal: string; 
    fecha: string; 
    estado: string; 
    idEmpleadoFK?: number; 
}
