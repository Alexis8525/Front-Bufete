import { Component } from './component.interface';

export class ConcreteComponent implements Component {
  operation(): void {
    console.log('Ejecutando operación principal');
  }
}
