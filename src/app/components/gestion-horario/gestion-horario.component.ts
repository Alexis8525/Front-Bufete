import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeleccionHorasComponent } from '../modals/seleccion-horas/seleccion-horas.component';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-gestion-horario',
  templateUrl: './gestion-horario.component.html',
  styleUrls: ['./gestion-horario.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
    FormsModule,
    SeleccionHorasComponent
  ]
})
export class GestionHorarioComponent implements OnInit {
  diasDelMes: number[] = [];
  mesActual: number;
  anioActual: number;
  nombreMesActual: string;
  nombresDias: string[] = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];
  abogados: string[] = ['Abogado 1', 'Abogado 2', 'Abogado 3'];
  selectedAbogado: string = this.abogados[0];

  @ViewChild('modalMensaje') modalMensaje: any;

  constructor(
    private modalService: NgbModal,
    public empleadoService: EmpleadoService
  ) {
    const fecha = new Date();
    this.mesActual = fecha.getMonth();
    this.anioActual = fecha.getFullYear();
    this.nombreMesActual = this.obtenerNombreMes();
  }

  ngOnInit(): void {
    this.generarDiasDelMes();
    this.getAbogado();
  }

  getAbogado() {
    this.empleadoService.getAbogado().subscribe(
      res => {
        this.empleadoService.empleados = res;
        console.log(res);
      },
      err => console.log(err)
    )
  }

  abrirModal(): void {
    const modalRef = this.modalService.open(SeleccionHorasComponent);
    modalRef.componentInstance.selectedAbogado = this.selectedAbogado; // Pasar el abogado seleccionado
  }

  cerrarModal() {
    this.modalService.dismissAll(); // Cierra el modal
  }

  obtenerNombreMes(): string {
    return new Date(this.anioActual, this.mesActual).toLocaleString('es-ES', { month: 'long' });
  }

  cambiarMes(incremento: number): void {
    this.mesActual += incremento;
    if (this.mesActual < 0) {
      this.mesActual = 11;
      this.anioActual--;
    } else if (this.mesActual > 11) {
      this.mesActual = 0;
      this.anioActual++;
    }
    this.nombreMesActual = this.obtenerNombreMes();
    this.generarDiasDelMes();
  }

  generarDiasDelMes(): void {
    const primerDia = new Date(this.anioActual, this.mesActual, 1).getDay();
    const diasEnElMes = new Date(this.anioActual, this.mesActual + 1, 0).getDate();
    const inicioCalendario = (primerDia === 0) ? 6 : primerDia - 1;

    this.diasDelMes = Array.from({ length: 42 }, (_, i) => {
      if (i < inicioCalendario || i >= inicioCalendario + diasEnElMes) {
        return 0;
      }
      return i - inicioCalendario + 1;
    });
  }
}
