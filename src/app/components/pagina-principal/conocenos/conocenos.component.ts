import { Component, OnInit } from '@angular/core';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from '../../pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css'],
  standalone: true,
  imports: [
    NavBarraComponent,
    BreadcrumbsComponent, 
    PiePaginaComponent
]
})
export class ConocenosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
