import { Component, OnInit } from '@angular/core';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [
    BarraLateralComponent,
  ]
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
