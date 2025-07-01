import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../breadcrumbs/breadcrumbs.component';
import { BarraLateralComponent } from '../../barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    BreadcrumbsComponent
],
})
export class PoliticasComponent implements OnInit {
navbarHidden: any;

  constructor() { }

  ngOnInit() {
  }

}
