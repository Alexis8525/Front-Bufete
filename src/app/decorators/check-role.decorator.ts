import { Component } from './component.interface';
import { Decorator } from './decorator';

export class CheckRoleDecorator extends Decorator {
  private requiredRole: string;

  constructor(component: Component, requiredRole: string) {
    super(component);
    this.requiredRole = requiredRole;
  }

  override operation(): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userRole = user?.rol;

    if (userRole === this.requiredRole) {
      console.log(`Acceso permitido para el rol: ${this.requiredRole}`);
      super.operation();
    } else {
      console.error(`Acceso denegado. Se requiere el rol: ${this.requiredRole}`);
      alert('No tienes permiso para realizar esta acción.');
    }
  }
}
