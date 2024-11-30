import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { FormsModule } from '@angular/forms';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { ExpedienteBase, PrioritarioExpediente, ArchivadoExpediente, ExpedienteComponent } from '../../decorador/expediente.decorator';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleados';

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
export class UploadFileComponent {
  clientes: Cliente[] = [];  // Lista de clientes
  clienteSeleccionado: number | null = null;  // ID del cliente seleccionado
  clienteDatos: Cliente | null = null;  // Datos del cliente seleccionado

  Abogado: Empleado[] = [];
  AbogadoSeleccionado: number | null = null;
  AbogadoDatos: Empleado | null = null;
  
  expediente: any = {
    numeroExpediente: '',
    estado: 'En revisión',
    nombreServicio: '',
    descrpcion: '',
    datosAbogado: {
      nombreEmpleado: '',
      aPEmpleado: '',
      aMEmpleado: '',
      numeroLicencia: '',
      telfono: ''
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

  archivos: { [key: string]: string | null } = {};
  idExpedienteCreado: number | null = null;

  // Variable para manejar los decoradores
  expedienteDecorado: string = '';

  constructor(private http: HttpClient, 
              private uploadFileService: UploadFileService, 
              private clienteService: ClienteService,
              private empleadiService: EmpleadoService ) {}

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
          this.expediente.nombreExpediente += ` - Abogado: ${data.nombreEmpleado} ${data.aPEmpleado} ${data.aMEmpleado}`;
          this.expediente.idEmpleadoFK = data.idEmpleado;
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
  
  

  onFileSelected(event: any, tipoDocumento: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.archivos[tipoDocumento] = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(file);
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
        console.log('Detalles del error:', err.error);
      }
    });
  }
  

  subirDocumentos() {
    if (!this.idExpedienteCreado) {
      console.error('No se ha creado un expediente');
      return;
    }

    const documentos = Object.keys(this.archivos).map((tipoDocumento) => ({
      documentoBase64: this.archivos[tipoDocumento] || '',
      idTipoDocumentoFK: this.obtenerIdTipoDocumento(tipoDocumento),
    }));

    if (documentos.some(doc => !doc.documentoBase64)) {
      console.error('Todos los documentos deben estar seleccionados');
      return;
    }

    this.uploadFileService.subirDocumentos(this.idExpedienteCreado, documentos).subscribe({
      next: (response: any) => {
        console.log('Documentos subidos correctamente:', response);
      },
      error: (err: any) => {
        console.error('Error al subir los documentos:', err);
      }
    });
  }

  obtenerIdTipoDocumento(tipoDocumento: string): number {
    const tipoDocumentoIds: { [key: string]: number } = {
      'CURP': 1,
      'Curriculum Vitae': 2,
      'Comprobante de Domicilio': 3,
      'Número de Seguridad Social (IMSS)': 4,
      'Identificación Oficial': 5
    };
    return tipoDocumentoIds[tipoDocumento] || 0;
  }

  onSubmit() {
    if (!this.expediente.numeroExpediente || !this.expediente.nombreServicio) {
      console.error('El número de expediente y el nombre del servicio son obligatorios');
      return;
    }
    this.crearExpediente();
  }

  // Métodos para aplicar los decoradores
  marcarPrioritario() {
    const expedienteBase = new ExpedienteBase();
    const expedientePrioritario = new PrioritarioExpediente(expedienteBase);
    this.expedienteDecorado = expedientePrioritario.getDetalle();
    console.log(this.expedienteDecorado);
  }

  archivarExpediente() {
    const expedienteBase = new ExpedienteBase();
    const expedienteArchivado = new ArchivadoExpediente(expedienteBase);
    this.expedienteDecorado = expedienteArchivado.getDetalle();
    console.log(this.expedienteDecorado);
  }
}
