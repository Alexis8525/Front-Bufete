export interface Usuario {
    idUsuario: number; 
    nombreUsuario: string; 
    pass: string; 
    estado: boolean; 
    idRolFK?: number; 
    idEmpleadoFK: number;
    idClienteFK: number;
}
