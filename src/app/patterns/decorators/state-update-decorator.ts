import { CitaService } from "../../services/cita.service";
import { ComponentDecorator } from "./abstract-decorator";
import { IComponent } from "./base-decorator.interface";

export class StateUpdateDecorator extends ComponentDecorator {
    constructor(
      component: IComponent,
      private citaService: CitaService,
      private onUpdate: () => void // Callback para notificar cambios
    ) {
      super(component);
    }
  
    override decorate(idCita: number): void {
      this.citaService.completarCita(idCita).subscribe(
        (response) => {
          console.log(`Estado de la cita con ID ${idCita} actualizado.`);
          this.onUpdate(); // Notificar cambios al componente
          super.decorate(idCita);
        },
        (error) => {
          console.error(`Error al completar la cita con ID ${idCita}:`, error);
        }
      );
    }
  }
  