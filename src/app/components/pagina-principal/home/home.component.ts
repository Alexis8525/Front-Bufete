import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavBarraComponent } from '../nav-barra/nav-barra.component';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { PiePaginaComponent } from "../../pie-de-pagina/pie-pagina/pie-pagina.component";
import { NgFor } from '@angular/common';
import * as bootstrap from 'bootstrap';  // Importar bootstrap para usar el carrusel manualmente

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarraComponent,
    BreadcrumbsComponent,
    PiePaginaComponent,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  carouselItems = [
    {
      src: 'img_pagina_principal/img1.jpg',
      title: 'Asesoría Personalizada',
      description: 'Comprometidos con tu crecimiento, ofrecemos soluciones legales integrales que aseguran el futuro de tu empresa.',
      interval: 5000
    },
    {
      src: 'img_pagina_principal/img2.jpg',
      title: 'Lex Vargas Abogados',
      description: 'Con más de 40 años de experiencia, en LexVargas somos tu aliado estratégico.',
      interval: 3000
    },
    {
      src: 'img_pagina_principal/img3.png',
      title: 'Lex Vargas Abogados',
      description: 'En LexVargas, nuestro compromiso es tu éxito. A través de un enfoque integral y personalizado.',
      interval: 7000
    }
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const carouselElement = document.querySelector('#carouselExample');
    if (carouselElement) {
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // Cambia el intervalo si lo deseas
        ride: 'carousel', // Esto hace que el carrusel comience a moverse automáticamente
      });
    }
  }
}
