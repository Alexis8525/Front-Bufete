import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class BreadcrumbsComponent implements OnInit {

  // Inyectar el servicio Location
  constructor(
    public breadcrumbService: BreadcrumbService,
    private location: Location  // Inyección de dependencias de Location
  ) { }

  ngOnInit() { }
  
  // Método para obtener el path actual
  get currentLocation() {
    return this.location.path();  // Devuelve la URL actual
  }
}
