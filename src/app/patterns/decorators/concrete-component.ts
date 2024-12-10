import { IComponent } from './base-decorator.interface';

export class ConcreteComponent implements IComponent {
  decorate(idCita: number): void {
    console.log(`Cita con ID ${idCita} procesada en el componente base.`);
  }
}
