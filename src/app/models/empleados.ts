export interface Empleado { 
    idEmpleado?: number;
    fechaIngreso: string;
    numeroLicencia?: string;
    correo: string;
    nombreEmpleado: string;
    aPEmpleado: string;
    aMEmpleado: string;
    telefono: string;
    pass: string; // Agregar la contraseña
    idRolFK: number; // Agregar el campo para el rol
    idEspecialidadFK: number; // Agregar el campo para la especialidad
}
