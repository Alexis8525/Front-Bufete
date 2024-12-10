// Archivo expediente.component.ts
export interface ExpedienteComponent {
    fechaArchivado: string;
    crearExpediente(): void;
    seleccionarCliente(clienteId: number | null): void;
    seleccionarAbogado(abogadoId: number | null): void;
    cargarClientes(): void;
    cargarAbogado(): void;
  }
  
  export abstract class ExpedienteDecoradorBase implements ExpedienteComponent {
    fechaArchivado: string = '';
    constructor(protected componente: ExpedienteComponent) {
        if (componente === this) {
          throw new Error('Un decorador no puede decorarse a sí mismo.');
        }
      }
  
    crearExpediente(): void {
        this.componente.crearExpediente();
      }
    
      seleccionarCliente(clienteId: number | null): void {
        this.componente.seleccionarCliente(clienteId);
      }
    
      seleccionarAbogado(abogadoId: number | null): void {
        this.componente.seleccionarAbogado(abogadoId);
      }
    
      cargarClientes(): void {
        this.componente.cargarClientes();
      }
    
      cargarAbogado(): void {
        this.componente.cargarAbogado();
      }
  }
  