import { ExpedienteDecorator } from './expediente.decorator';

export class CargarInformacionConValidacionDecorator extends ExpedienteDecorator {
  override cargarInformacion() {
    console.log('Validando la información antes de cargar...');
    super.cargarInformacion();
  }
}
