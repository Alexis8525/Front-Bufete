export interface Usuario {
    idUsuario: number; // Identificador único del usuario
    nombreUsuario: string; // Nombre de usuario
    pass: string; // Contraseña del usuario
    estado: boolean; // Estado del usuario (activo/inactivo)
    idRolFK?: number; // Identificador del rol asociado (opcional)
}
