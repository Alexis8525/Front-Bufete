import { IComponent } from "./base-decorator.interface";

export class ConcreteComponent implements IComponent {
    operation(idCita: number): void {
      console.log(`Cita con ID ${idCita} atendida.`);
      // Lógica base para atender la cita
    }
  }
  