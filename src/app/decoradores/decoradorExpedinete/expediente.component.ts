// Archivo expediente.component.ts
export interface ExpedienteComponent {
    crearExpediente(): void;
    seleccionarCliente(clienteId: number | null): void;
    seleccionarAbogado(abogadoId: number | null): void;
    cargarClientes(): void;
    cargarAbogado(): void;
  }
  
  export class ExpedienteDecoradorBase implements ExpedienteComponent {
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
  