//componte upload-file-component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { FormsModule } from '@angular/forms';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleados';
import { ExpedienteComponent } from '../../decoradores/decoradorExpedinete/expediente.component';
import { ExpedienteConPrioridadDecorator } from '../../decoradores/decoradorExpedinete/expediente-con-prioridad.decorador';
import { ExpedienteArchivadoDecorator } from '../../decoradores/decoradorExpedinete/expediente-archivado.decorador';


@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements ExpedienteComponent{
  expedienteDecorado: ExpedienteComponent | null = null;
  clientes: Cliente[] = [];  // Lista de clientes
  clienteSeleccionado: number | null = null;  // ID del cliente seleccionado
  clienteDatos: Cliente | null = null;  // Datos del cliente seleccionado

  Abogado: Empleado[] = [];
  AbogadoSeleccionado: number | null = null;
  AbogadoDatos: Empleado | null = null;
  
  expediente: any = {
    numeroExpediente: '',
    estado: '',
    nombreServicio: '',
    descrpcion: '',
    datosAbogado: {
      nombreEmpleado: '',
      aPEmpleado: '',
      aMEmpleado: '',
      numeroLicencia: '',
      telfono: '',
      correo: ''
    },
    datosCliente: {
      nombreCliente: '',
      aPCliente: '',
      aMCliente: '',  
      direccion: '',
      telefono: '',
      correo: ''
    },
    fechaApertura: new Date().toISOString(),
    idClienteFK: 100006,
    idEmpleadoFK: 1007,
  };
  documentos: string[] = [
    'CURP',
    'Curriculum Vitae',
    'Comprobante de Domicilio',
    'Número de Seguridad Social (IMSS)',
    'Identificación Oficial'
  ];
  fechaArchivado: string = '';

  idExpedienteCreado: number | null = null;

  constructor(
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    private clienteService: ClienteService,
    private empleadiService: EmpleadoService
    ) {}

   ngOnInit(): void {
    this.cargarClientes();  // Cargar los clientes al inicializar el componente
    this.cargarAbogado();  // Cargar los abogados
  }
  

  cargarAbogado(): void {
    this.empleadiService.getAbogado().subscribe(
      (data: Empleado[]) => {
        this.Abogado = data;  // Almacenar los abogados obtenidos en la variable Abogado
      },
      (error) => {
        console.error('Error al obtener los abogados', error);
      }
    );
  }
  aplicarDecorador(tipo: string): void {
    switch (tipo) {
      case 'prioridad':
        if (this.expedienteDecorado instanceof ExpedienteConPrioridadDecorator) {
          console.warn('El expediente ya está decorado con prioridad.');
          return;
        }
        this.expedienteDecorado = new ExpedienteConPrioridadDecorator(this.expedienteDecorado || this);
        console.log('Decorador de prioridad aplicado.');
  
        // Cambiar el estado del expediente a "Prioridad Alta"
        this.expediente.estado = 'Prioridad Alta';
  
        // Mostrar alerta cuando se aplica el decorador de prioridad
        alert('Expediente creado con prioridad alta.');
  
        // Recargar la página después de aceptar la alerta
        window.location.reload();
        break;
  
      case 'archivado':
        if (this.expedienteDecorado instanceof ExpedienteArchivadoDecorator) {
          console.warn('El expediente ya está decorado como archivado.');
          return;
        }
        this.expedienteDecorado = new ExpedienteArchivadoDecorator(this.expedienteDecorado || this);
        console.log('Decorador de archivado aplicado.');
        this.expediente.estado = 'Archivado';
  
        // Mostrar alerta cuando se aplica el decorador de prioridad
        alert('Expediente a sido Archivado.');
  
        // Recargar la página después de aceptar la alerta
        window.location.reload();
        break;
  
      default:
        console.error('Tipo de decorador no válido');
        break;
    }
  }
  
  
  
  cargarClientes(): void {
    this.clienteService.getClientes().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;  // Almacenar los clientes obtenidos en la variable clientes
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }

  cargarDatosCliente(): void {
    if (this.clienteSeleccionado) {
      this.clienteService.getClienteById(this.clienteSeleccionado).subscribe(
        (data: Cliente) => {
          this.clienteDatos = data;
          this.expediente.datosCliente = {
            nombreCliente: data.nombreCliente,
            aPCliente: data.aPCliente,
            aMCliente: data.aMCliente,
            direccion: data.direccion,
            telefono: data.telefono,
            correo: data.correo
          };
          this.expediente.nombreExpediente = `${data.nombreCliente} ${data.aPCliente} ${data.aMCliente}`;
          this.expediente.idClienteFK = data.idCliente;
  
          // Generar número de expediente automáticamente
          this.expediente.numeroExpediente = `EXP-${data.idCliente}-${new Date().getFullYear()}`;
        },
        (error) => {
          console.error('Error al obtener los datos del cliente', error);
        }
      );
    }
  }
  

  cargarDatosAbogado(): void {
    if (this.AbogadoSeleccionado) {
      this.empleadiService.getEmpleadoById(this.AbogadoSeleccionado).subscribe(
        (data: Empleado) => {
          this.AbogadoDatos = data;
          
          // Asignar los datos del abogado al expediente
          this.expediente.datosAbogado = {
            nombreAbogado: data.nombreEmpleado,
            aPAbogado: data.aPEmpleado,
            aMAbogado: data.aMEmpleado,
            licencia: data.numeroLicencia ? data.numeroLicencia : 'No registrada', // Si no tiene licencia, asigna 'No registrada'
            telefono: data.telefono ? data.telefono : 'Sin teléfono', // Si no tiene teléfono, asigna 'Sin teléfono'
            correo: data.correo // Si tiene correo, lo asignamos
          };
  
          // Agregar el nombre del abogado al nombre del expediente
          this.expediente.nombreExpediente += ` - Abogado: ${data.nombreEmpleado} ${data.aPEmpleado} ${data.aMEmpleado}`;
  
          // Asignar el ID del abogado al expediente
          this.expediente.idEmpleadoFK = data.idEmpleado;
  
          // Generar número de expediente automáticamente (en el mismo formato)
          this.expediente.numeroExpediente = `EXP-${this.expediente.idClienteFK}-${new Date().getFullYear()}`;
        },
        (error) => {
          console.error('Error al obtener los datos del abogado', error);
        }
      );
    }
  }
  
  

  seleccionarAbogado(abogadoId: number | null): void {
    if (abogadoId === null) {
      console.error("Abogado no seleccionado");
      return;
    }
    this.AbogadoSeleccionado = abogadoId;
    const abogado = this.Abogado.find(a => a.idEmpleado === abogadoId);
    if (abogado) {
      this.expediente.idEmpleadoFK = abogado.idEmpleado;
      this.expediente.nombreExpediente += ` - Abogado: ${abogado.nombreEmpleado} ${abogado.aPEmpleado} ${abogado.aMEmpleado}`;
    }
  }

  seleccionarCliente(clienteId: number | null): void {
    if (clienteId === null) {
      console.error("Cliente no seleccionado");
      return;
    }
    this.clienteSeleccionado = clienteId;
    const cliente = this.clientes.find(c => c.idCliente === clienteId);
    if (cliente) {
      this.expediente.idClienteFK = cliente.idCliente;
      this.expediente.nombreExpediente = `${cliente.nombreCliente} ${cliente.aPCliente} ${cliente.aMCliente}`;
    }
  }
  

  crearExpediente() {
    if (!this.expediente.idClienteFK || !this.expediente.idEmpleadoFK) {
      console.error('Debe seleccionar un cliente y un abogado antes de crear el expediente.');
      return;
    }
  
    this.uploadFileService.crearExpediente(this.expediente).subscribe({
      next: (response: any) => {
        this.idExpedienteCreado = response.idExpediente;
        console.log('Expediente creado:', response);
      },
      error: (err: any) => {
        console.error('Error al crear el expediente:', err);
      }
    });
  }
  
  
  

  // subirDocumentos() {
  //   if (!this.idExpedienteCreado) {
  //     console.error('No se ha creado un expediente');
  //     return;
  //   }

  //   const documentos = Object.keys(this.archivos).map((tipoDocumento) => ({
  //     documentoBase64: this.archivos[tipoDocumento] || '',
  //     idTipoDocumentoFK: this.obtenerIdTipoDocumento(tipoDocumento),
  //   }));

  //   if (documentos.some(doc => !doc.documentoBase64)) {
  //     console.error('Todos los documentos deben estar seleccionados');
  //     return;
  //   }

  //   this.uploadFileService.subirDocumentos(this.idExpedienteCreado, documentos).subscribe({
  //     next: (response: any) => {
  //       console.log('Documentos subidos correctamente:', response);
  //     },
  //     error: (err: any) => {
  //       console.error('Error al subir los documentos:', err);
  //     }
  //   });
  // }

  // obtenerIdTipoDocumento(tipoDocumento: string): number {
  //   const tipoDocumentoIds: { [key: string]: number } = {
  //     'CURP': 1,
  //     'Curriculum Vitae': 2,
  //     'Comprobante de Domicilio': 3,
  //     'Número de Seguridad Social (IMSS)': 4,
  //     'Identificación Oficial': 5
  //   };
  //   return tipoDocumentoIds[tipoDocumento] || 0;
  // }

  onSubmit() {
    if (!this.expediente.numeroExpediente || !this.expediente.nombreServicio) {
      console.error('El número de expediente y el nombre del servicio son obligatorios');
      return;
    }
    this.crearExpediente();
  }
}
