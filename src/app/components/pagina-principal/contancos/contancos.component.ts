import { Component } from '@angular/core';
import { NavBarraComponent } from "../nav-barra/nav-barra.component";
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";



@Component({
  selector: 'app-contancos',
  templateUrl: './contancos.component.html',
  styleUrls: ['./contancos.component.css'],
  standalone: true,
  imports: [NavBarraComponent, BreadcrumbsComponent],
})
export class ContancosComponent {
}
