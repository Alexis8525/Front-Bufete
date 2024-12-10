import { IComponent } from './base-decorator.interface';

export abstract class ComponentDecorator implements IComponent {
  protected component: IComponent;

  constructor(component: IComponent) {
    this.component = component;
  }

  decorate(idCita: number): void {
    this.component.decorate(idCita);
  }
}
