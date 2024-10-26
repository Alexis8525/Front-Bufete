export interface Empleado {
    idEmpleado: number;
    fechaIngreso: string;
    numeroLicencia?: string;
    correo: string;
    nombreEmpleado: string;
    aPEmpleado: string;
    aMEmpleado: string;
    telefono: string;
    especialidad?: string;
    idUsuarioFK: number;
}
