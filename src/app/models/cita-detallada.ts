export interface CitaDetallada {
    idCita: number;
    motivo: string;
    estadoCita: string;
    nombreCliente: string;
    apellidoPaternoCliente: string;
    apellidoMaternoCliente: string;
    fechaCita: string;
    horaInicio: string;
    horaFinal: string;
    abogadoNombre: string;
    abogadoApellidoPaterno: string;
    abogadoApellidoMaterno: string;
    nombreServicio: string;
    descripcionServicio: string;
    costoServicio: number;
    idServicioFK: number; // Asegúrate de incluir idServicio aquí
  }
  