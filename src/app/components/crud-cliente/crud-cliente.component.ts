import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { RolService } from '../../services/rol.service';
import { NgForm } from '@angular/forms';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { Cliente } from '../../models/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css'],
  imports: [
    BarraLateralComponent,
    CommonModule,
  ],
  standalone: true
})
export class CrudClienteComponent implements OnInit {

  constructor(
    public clienteService:ClienteService,
    public rolService:RolService,
  ) { }

  ngOnInit(): void{
    this.getClientes()
    this.getRoles()
  }

  // Obtener la lista de clientes
  getClientes() {
    this.clienteService.getClientes().subscribe(
      res => {
        this.clienteService.clientes = res;
      },
      err => console.log(err)
    )
  }

  getRoles(){
    this.rolService.getRoles().subscribe(
      res => {
        this.rolService.roles = res;
      },
      err => console.log(err)
    )
  }

  // Crear un nuevo cliente
  crearCliente(form:NgForm) {
    console.log('Formulario enviado:', form.value);
    alert('Insertando nuevo cliente');
    this.clienteService.crearCliente(form.value).subscribe(
      res => {
        this.getClientes();
        form.reset();
      }
    )
  }

  editarEmpleado(itemE: any) {
    this.clienteService.cliente = { ...itemE };
    this.clienteService.cliente.idCliente = itemE.idEmpleado; // Asegúrate de tener el ID
}

}
