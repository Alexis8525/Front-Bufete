import { ComponentDecorator } from './abstract-decorator';
import { IComponent } from './base-decorator.interface';

export class RoleCheckDecorator extends ComponentDecorator {
  private requiredRole: number;

  constructor(component: IComponent, requiredRole: number) {
    super(component);
    this.requiredRole = requiredRole;
  }

  override decorate(idCita: number): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (user.rol === this.requiredRole) {
      console.log(`Rol verificado: ${user.rol}. Procesando cita con ID ${idCita}.`);
      super.decorate(idCita);
    } else {
      console.warn(`Acceso denegado. Rol requerido: ${this.requiredRole}`);
      alert('No tienes permiso para realizar esta acción.');
    }
  }
}
