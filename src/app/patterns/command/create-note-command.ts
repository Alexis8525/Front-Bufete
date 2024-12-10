import { ICommand } from './command.interface';
import { NotaService } from '../../services/nota.service';
import { Nota } from '../../models/notas';

export class CreateNoteCommand implements ICommand {
  constructor(
    private notaService: NotaService,
    private nota: Nota
  ) {}

  execute(): void {
    this.notaService.crearNota(this.nota).subscribe({
      next: (response) => console.log('Nota creada exitosamente:', response),
      error: (err) => console.error('Error al crear la nota:', err),
    });
  }
}
