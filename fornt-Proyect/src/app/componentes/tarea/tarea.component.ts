import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/servicios/tarea.service';
import { EditTareaDialogComponent } from '../edit-tarea-dialog/edit-tarea-dialog.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea: Tarea = { id: 0, nombre: '', descripcion: '', proyectoId: 0 };
  displayedColumns: string[] = ['nombre', 'descripcion', 'actions'];

  constructor(private tareasService: TareaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerTareas();
  }

  obtenerTareas(): void {
    this.tareasService.obtenerTareas().subscribe((data: Tarea[]) => {
      this.tareas = data;
    });
  }

  crearTarea(): void {
    this.tareasService.crearTarea(this.nuevaTarea).subscribe(() => {
      this.obtenerTareas();
      this.nuevaTarea = { id: 0, nombre: '', descripcion: '', proyectoId: 0 };
    });
  }

  borrarTarea(id: number): void {
    this.tareasService.borrarTarea(id).subscribe(() => {
      this.obtenerTareas();
    });
  }

  abrirDialogoTarea(tarea?: Tarea): void {
    const dialogRef = this.dialog.open(EditTareaDialogComponent, {
      width: '300px',
      data: tarea
        ? { ...tarea }
        : { id: 0, nombre: '', descripcion: '', proyectoId: 0 },
    });

    dialogRef.afterClosed().subscribe((result: Tarea | undefined) => {
      if (result) {
        if (result.id) {
          this.tareasService.actualizarTarea(result).subscribe(() => {
            this.obtenerTareas();
          });
        } else {
          this.tareasService.crearTarea(result).subscribe(() => {
            this.obtenerTareas();
          });
        }
      }
    });
  }
}
