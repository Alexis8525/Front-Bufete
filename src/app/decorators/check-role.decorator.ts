import { BasicComponent } from './component.interface';

export class CheckRoleDecorator implements BasicComponent {
  private requiredRole: number;

  constructor(private component: BasicComponent, requiredRole: number) {
    this.requiredRole = requiredRole;
  }

  operation(): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (user.rol === this.requiredRole) {
      console.log(`Rol verificado. Ejecutando operación para el rol ${this.requiredRole}`);
      this.component.operation();
    } else {
      console.warn(`Acceso denegado. Rol requerido: ${this.requiredRole}, Rol actual: ${user.rol}`);
      alert('No tienes permiso para realizar esta acción.');
    }
  }
}
