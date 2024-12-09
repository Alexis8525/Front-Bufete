import { Component } from './component.interface';

export abstract class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  operation(): void {
    this.component.operation();
  }
}
