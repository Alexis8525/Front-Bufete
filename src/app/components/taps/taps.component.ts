import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { InformacionGeneralComponent } from '../informacion-general/informacion-general.component';
// import { DatosPartesComponent } from '../datos-partes/datos-partes.component';
// import { RegistroCitasComponent } from '../registro-citas/registro-citas.component';
// import { DocumentacionLegalComponent } from '../documentacion-legal/documentacion-legal.component';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-taps',
  standalone: true,
  imports: [
    CommonModule, // Agrega CommonModule
    MatTabsModule, // Agrega MatTabsModule
    // DocumentacionLegalComponent, 
    InformacionGeneralComponent, 
    // DatosPartesComponent, 
    // RegistroCitasComponent,
    BarraLateralComponent,
    FormsModule
  ],
  templateUrl: './taps.component.html',
  styleUrl: './taps.component.css'
})
export class TapsComponent {
  expedientes: any = {
    idExpediente: 1,
    fechaApertura: '2024-01-01',
    fechaCreacion: '2024-01-01',
    estado: 'Activo',
    descripcion: 'Expediente inicial',
    nombreServicio: 'Consulta legal',
    estadoExpediente: 'En revisión',
    datosAbogado: 'Abogado ABC',
    datosCliente: 'Cliente XYZ'
  }; // Define la propiedad
  partes: any = {};     // Otra propiedad necesaria
  citas: any = [];
  documentos: any = [];

}
