import { Decorator } from './abstract-decorator';
import { CitaService } from '../../services/cita.service';
import { IComponent } from './base-decorator.interface';

export class StateUpdateDecorator extends Decorator {
  constructor(
    component: IComponent,
    private citaService: CitaService,
    private onUpdate: () => void // Callback para recargar citas
  ) {
    super(component);
  }

  override operation(idCita: number): void {
    this.citaService.completarCita(idCita).subscribe({
      next: (response) => {
        console.log(`Estado de la cita con ID ${idCita} actualizado en el servidor.`);
        this.onUpdate(); // Notificar al componente principal
        super.operation(idCita); // Llama al componente decorado
      },
      error: (error) => {
        console.error(`Error al actualizar el estado de la cita con ID ${idCita}:`, error);
      },
    });
  }
}
