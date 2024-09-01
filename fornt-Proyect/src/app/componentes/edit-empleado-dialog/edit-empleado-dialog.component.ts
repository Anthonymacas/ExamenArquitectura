import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { Empleado } from 'src/app/interfaces/empleado';

@Component({
  selector: 'app-edit-empleado-dialog',
  templateUrl: './edit-empleado-dialog.component.html',
  styleUrls: ['./edit-empleado-dialog.component.scss'],
})
export class EditEmpleadoDialogComponent {
  empleadoForm: FormGroup;
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditEmpleadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Empleado,
    private fb: FormBuilder,
    private empleadoService: EmpleadoService
  ) {
    this.isEditMode = data.id !== 0; // Determine if in edit mode
    this.empleadoForm = this.fb.group({
      nombre: [data.nombre || '', Validators.required],
      apellido: [data.apellido || '', Validators.required],
      email: [data.email || '', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarCambios(): void {
    if (this.empleadoForm.valid) {
      const empleado = this.empleadoForm.value;
      if (this.isEditMode) {
        // Update existing employee
        this.empleadoService.updateEmpleado(this.data.id, empleado).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        // Create new employee
        this.empleadoService.createEmpleado(empleado).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
