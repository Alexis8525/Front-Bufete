import { IComponent } from './base-decorator.interface';

export abstract class Decorator implements IComponent {
  protected component: IComponent;

  constructor(component: IComponent) {
    this.component = component;
  }

  operation(idCita: number): void {
    this.component.operation(idCita); // Delegar al componente decorado
  }
}
