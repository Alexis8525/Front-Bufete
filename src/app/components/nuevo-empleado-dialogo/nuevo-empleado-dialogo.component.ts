import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-nuevo-empleado-dialogo',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule
  ],
  templateUrl: './nuevo-empleado-dialogo.component.html',
  styleUrl: './nuevo-empleado-dialogo.component.css'
})
export class NuevoEmpleadoDialogoComponent {
  constructor(
    public dialogRef: MatDialogRef<NuevoEmpleadoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Aquí recibirás los datos
  ) {
    // Verificar que los datos inyectados sean válidos
    if (!this.data) {
      this.data = {
        nombreEmpleado: '',
        aPEmpleado: '',
        aMEmpleado: ''
      };
    }
  }

  // Método para cerrar el diálogo sin guardar cambios
onNoClick(): void {
  this.dialogRef.close();
}

// Método para confirmar los cambios
onConfirm(): void {
  // Aquí puedes incluir cualquier lógica adicional antes de cerrar
  this.dialogRef.close(this.data); // Envía los datos modificados
}

/*
  // Método para cerrar el diálogo sin guardar cambios
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Método para confirmar los cambios
  onConfirm(): void {
    // Puedes agregar validación aquí si es necesario
    this.dialogRef.close(this.data); // Envía los datos al componente que llamó el modal
  }*/
}
