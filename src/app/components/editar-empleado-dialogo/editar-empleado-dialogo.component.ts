import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para ngModel
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importar MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Importar MatButtonModule
import { MatCardModule } from '@angular/material/card'; // Importar MatCardModule

@Component({
  selector: 'app-editar-empleado-dialogo',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule 
  ],
  templateUrl: './editar-empleado-dialogo.component.html',
  styleUrl: './editar-empleado-dialogo.component.css'
})
export class EditarEmpleadoDialogoComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarEmpleadoDialogoComponent>,
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
