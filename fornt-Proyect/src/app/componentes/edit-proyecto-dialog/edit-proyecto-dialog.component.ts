import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProyectoService } from 'src/app/servicios/proyecto.service';  
import { Proyecto } from 'src/app/interfaces/proyecto';

@Component({
  selector: 'app-edit-proyecto-dialog',
  templateUrl: './edit-proyecto-dialog.component.html',
  styleUrls: ['./edit-proyecto-dialog.component.scss'],
})
export class EditProyectoDialogComponent {
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditProyectoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proyecto,
    private proyectoService: ProyectoService
  ) {
    this.isEditMode = data.id !== 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async guardarCambios(): Promise<void> {
    try {
      if (this.isEditMode) {
        await this.proyectoService.actualizarProyecto(this.data).toPromise();
      } else {
        await this.proyectoService.crearProyecto(this.data).toPromise();
      }
      this.dialogRef.close(this.data);
    } catch (error) {
      console.error('Error guardando proyecto:', error);
    }
  }
}
