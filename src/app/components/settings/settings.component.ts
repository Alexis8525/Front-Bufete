import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component';
import { IncidentPlanModalComponent } from '../incident-plan-modal/incident-plan-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    BarraLateralComponent, // Importa la barra lateral
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private router: Router, private dialog: MatDialog) {}

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  changePassword(): void {
    this.router.navigate(['/change-password']);
  }

  configureNotifications(): void {
    this.router.navigate(['/notifications']);
  }
  showIncidentResponsePlan(): void {
    this.dialog.open(IncidentPlanModalComponent, {
      width: '800px',
      maxHeight: '90vh',
      panelClass: 'incident-plan-modal'
    });
  }
}