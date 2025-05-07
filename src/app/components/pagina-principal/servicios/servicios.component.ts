import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavBarraComponent } from "../nav-barra/nav-barra.component";
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from "../../pie-de-pagina/pie-pagina/pie-pagina.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  standalone: true,
  imports: [NavBarraComponent, BreadcrumbsComponent, PiePaginaComponent, NgIf, NgFor],
})
export class ServiciosComponent implements OnInit {

  // Secciones que están visibles actualmente
  seccionesVisibles: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Si se llega con un fragmento (como #comercial), lo muestra
    this.route.fragment.subscribe(fragment => {
      if (fragment && !this.seccionesVisibles.includes(fragment)) {
        this.seccionesVisibles.push(fragment);
        const element = document.getElementById(fragment);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 200); // pequeña espera para que se renderice
        }
      }
    });
  }

  // Mostrar u ocultar una sección al hacer clic
  toggleSeccion(seccion: string): void {
    const index = this.seccionesVisibles.indexOf(seccion);
    if (index === -1) {
      this.seccionesVisibles.push(seccion); // Mostrar
    } else {
      this.seccionesVisibles.splice(index, 1); // Ocultar
    }
  }

  // Servicios por categoría
  serviciosCivil = [
    { titulo: 'Asesoría Legal', descripcion: 'Este servicio ofrece orientación y apoyo legal en temas civiles...', precio: '$150.00' },
    { titulo: 'Mediación de Conflictos', descripcion: 'Resolución alternativa de conflictos mediante mediación...', precio: '$250.00' },
    { titulo: 'Gestión de Contratos', descripcion: 'Revisión y redacción de contratos civiles...', precio: '$220.00' },
    { titulo: 'Asesoría en Divorcios', descripcion: 'Apoyo legal en procesos de divorcio, custodia y bienes...', precio: '$350.00' },
  ];

  serviciosComercial = [
    { titulo: 'Asesoría Inmobiliaria', descripcion: 'Orientación legal en compra, venta y arrendamiento...', precio: '$170.00' },
    { titulo: 'Asesoría Legal Comercial', descripcion: 'Constitución de empresas, contratos mercantiles...', precio: '$150.00' },
  ];

  serviciosAmbiental = [
    { titulo: 'Asesoría en Compliance', descripcion: 'Cumplimiento de normativas ambientales nacionales e internacionales...', precio: '$220.00' },
    { titulo: 'Asistencia Legal Ambiental', descripcion: 'Gestión de residuos y mitigación de impactos ambientales...', precio: '$150.00' },
  ];

  serviciosIntelectual = [
    { titulo: 'Asesoría en Propiedad Intelectual', descripcion: 'Registro y protección de patentes, marcas y derechos de autor...', precio: '$250.00' },
    { titulo: 'Gestión de Marcas', descripcion: 'Registro, defensa y renovación de marcas comerciales...', precio: '$200.00' },
  ];

  serviciosFiscal = [
    { titulo: 'Asesoría en Derecho Fiscal', descripcion: 'Cumplimiento tributario y estrategias fiscales...', precio: '$300.00' },
    { titulo: 'Gestión de Impuestos', descripcion: 'Declaraciones, pagos y control fiscal eficiente...', precio: '$220.00' },
  ];
}
