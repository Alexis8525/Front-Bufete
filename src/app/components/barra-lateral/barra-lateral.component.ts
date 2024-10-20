import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-lateral',
  standalone: true,
  imports: [],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class BarraLateralComponent {
  // Método para manejar el clic del botón
  toggleSidebar(): void {
    const sidebar = document.querySelector("#sidebar") as HTMLElement | null;
    sidebar?.classList.toggle("expand");
  }
}
