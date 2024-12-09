import { BasicComponent } from './component.interface';

export class ConcreteComponent implements BasicComponent {
  operation(): void {
    console.log('Ejecutando operación principal');
  }
}
