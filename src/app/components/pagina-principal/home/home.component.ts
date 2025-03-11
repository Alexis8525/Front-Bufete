import { Component, OnInit } from '@angular/core';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from "../../pie-de-pagina/pie-pagina/pie-pagina.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarraComponent, BreadcrumbsComponent, PiePaginaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
