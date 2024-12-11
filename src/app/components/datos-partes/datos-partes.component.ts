import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datos-partes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-partes.component.html',
  styleUrl: './datos-partes.component.css'
})
export class DatosPartesComponent {
  @Input() partes: any;
}
