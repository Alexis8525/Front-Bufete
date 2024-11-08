export interface Servicio {
    idServicio: number; // Identificador único del servicio
    nombreServicio: string; // Nombre del servicio
    descripcion?: string; // Descripción del servicio (opcional)
    costo: number; // Costo del servicio
    especialidad?: string; // Especialidad del servicio (opcional)
    nivelExperiencia?: string; // Nivel de experiencia del abogado en este servicio (opcional)
}
