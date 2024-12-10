import { ExpedienteDecorator } from "./expediente.decorator";

export class CargarDocumentosConAlertaDecorator extends ExpedienteDecorator {
  override cargarDocumentos() {
    console.log('Mostrando alerta antes de cargar los documentos...');
    super.cargarDocumentos();
  }
}
