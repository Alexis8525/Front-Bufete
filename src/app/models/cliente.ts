export interface Cliente {
    idCliente: number; // Asegúrate de que sea >= 1001
    nombreCliente: string;
    aPCliente: string; // Apellido Paterno
    aMCliente: string; // Apellido Materno
    direccion: string;
    correo: string; // Debe ser único
    telefono: string;
    pass: string; // Contraseña
    idUsuarioFK?: number; // FK opcional para el usuario
    idRolFK?: number; // FK opcional para el rol
}
