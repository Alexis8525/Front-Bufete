import { ICommand } from './command.interface';
import { Nota } from '../../models/notas';

export class ValidateNoteCommand implements ICommand {
  constructor(
    private expedienteId: number,
    private citaId: number,
    private nota: Nota
  ) {}

  execute(): void {
    if (!this.expedienteId || !this.citaId || !this.nota.titulo || !this.nota.descripcion) {
      throw new Error('Todos los campos de la nota son obligatorios.');
    }
  }
}
