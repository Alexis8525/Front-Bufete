import { BasicComponent } from './component.interface';

export abstract class Decorator implements BasicComponent {
  protected component: BasicComponent;

  constructor(component: BasicComponent) {
    this.component = component;
  }

  operation(): void {
    this.component.operation();
  }
}
