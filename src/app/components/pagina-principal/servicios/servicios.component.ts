import { Component, OnInit } from '@angular/core';
import { NavBarraComponent } from "../nav-barra/nav-barra.component";
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [NavBarraComponent, BreadcrumbsComponent],
})
export class ServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
