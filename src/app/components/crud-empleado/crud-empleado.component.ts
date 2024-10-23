import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { Empleado } from '../../models/empleados';
import { EmpleadoService } from '../../services/empleado.service';


@Component({
  selector: 'app-crud-empleado',
  standalone: true,
  imports: [
    BarraLateralComponent,
    CommonModule,
  ],
  templateUrl: './crud-empleado.component.html',
  styleUrl: './crud-empleado.component.css'
})

export class CrudEmpleadoComponent implements OnInit {

  empleados: Empleado[] = []; // Declarar la propiedad empleados

  constructor( public empleadoService:EmpleadoService) {}

  ngOnInit() {
    this.getEmpleadoAbogado();
  }

  getEmpleadoAbogado(){
    this.empleadoService.getEmpleadoAbogado().subscribe(
      res => {
        this.empleados = res; 
      },
      err => console.log(err)
    )
  }
}
