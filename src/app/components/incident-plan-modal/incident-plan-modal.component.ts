import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incident-plan-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    
  ],
  templateUrl: './incident-plan-modal.component.html',
  styleUrls: ['./incident-plan-modal.component.css']
})
export class IncidentPlanModalComponent {
  constructor(public dialogRef: MatDialogRef<IncidentPlanModalComponent>) {}

  markdownContent = `
# Plan de Respuesta ante Incidentes de Seguridad

## 1. Detección del Incidente
- Monitoreo continuo de:
  - Logs de errores en el backend
  - Intentos de acceso no autorizados
  - Comportamientos anómalos en el tráfico de red
  - Actividad inusual en cuentas privilegiadas

## 2. Clasificación y Priorización
- **Nivel 1**: Crítico (afecta a todos los usuarios)
- **Nivel 2**: Alto (afecta a muchos usuarios)
- **Nivel 3**: Medio (afecta limitadamente)
- **Nivel 4**: Bajo (impacto mínimo)

## 3. Notificación
- **Responsable**: Roberto Díaz Galindo
- **Tiempo de respuesta**:
  - Críticos: 15 minutos
  - Altos: 30 minutos
  - Otros: 1 hora

[Continúa con el resto de tu contenido...]
`;

  close(): void {
    this.dialogRef.close();
  }
}