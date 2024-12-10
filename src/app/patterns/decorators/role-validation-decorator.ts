import { Decorator } from './abstract-decorator';
import { IComponent } from './base-decorator.interface';

export class RoleValidationDecorator extends Decorator {
  private usuarioRol: number;

  constructor(component: IComponent, usuarioRol: number) {
    super(component);
    this.usuarioRol = usuarioRol;
  }

  override operation(idCita: number): void {
    if (this.usuarioRol !== 2) { // Solo abogados (rol 2) pueden atender citas
      console.warn('No tienes permiso para atender esta cita.');
      alert('Solo los abogados pueden atender citas.');
      return;
    }

    console.log('Validación de rol exitosa.');
    super.operation(idCita);
  }
}
