
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TareaService } from 'src/app/services/tarea.service';  // Ajusta la ruta al servicio
import { Tarea } from 'src/app/interfaces/tarea';

@Component({
  selector: 'app-edit-tarea-dialog',
  templateUrl: './edit-tarea-dialog.component.html',
  styleUrls: ['./edit-tarea-dialog.component.scss'],
})
export class EditTareaDialogComponent {
  isEditMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditTareaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tarea,
    private tareaService: TareaService
  ) {
    this.isEditMode = data.id !== 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async guardarCambios(): Promise<void> {
    try {
      if (this.isEditMode) {
        await this.tareaService.actualizarTarea(this.data).toPromise();
      } else {
        await this.tareaService.crearTarea(this.data).toPromise();
      }
      this.dialogRef.close(this.data);
    } catch (error) {
      console.error('Error guardando tarea:', error);
    }
  }
}
