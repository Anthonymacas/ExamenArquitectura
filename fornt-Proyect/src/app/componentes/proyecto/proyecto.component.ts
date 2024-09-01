import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/interfaces/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { EditProyectoDialogComponent } from '../edit-proyecto-dialog/edit-proyecto-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
})
export class ProyectoComponent implements OnInit {
  proyectos: Proyecto[] = [];
  nuevoProyecto: Proyecto = { id: 0, nombre: '', descripcion: '' };
  displayedColumns: string[] = ['nombre', 'descripcion', 'actions'];

  constructor(
    private proyectoServicio: ProyectoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  obtenerProyectos(): void {
    this.proyectoServicio.obtenerProyectos().subscribe((data: Proyecto[]) => {
      this.proyectos = data;
    });
  }

  crearProyecto(): void {
    this.proyectoServicio.crearProyecto(this.nuevoProyecto).subscribe(() => {
      this.obtenerProyectos();
      this.nuevoProyecto = { id: 0, nombre: '', descripcion: '' };
    });
  }

  borrarProyectos(id: number): void {
    this.proyectoServicio.borrarProyecto(id).subscribe(() => {
      this.obtenerProyectos();
    });
  }

  abrirDialogoProyecto(proyecto?: Proyecto): void {
    const dialogRef = this.dialog.open(EditProyectoDialogComponent, {
      width: '300px',
      data: proyecto ? { ...proyecto } : { id: 0, nombre: '', descripcion: '' },
    });

    dialogRef.afterClosed().subscribe((result: Proyecto | undefined) => {
      if (result) {
        if (result.id) {
          this.proyectoServicio.actualizarProyecto(result).subscribe(() => {
            this.obtenerProyectos();
          });
        } else {
          this.proyectoServicio.crearProyecto(result).subscribe(() => {
            this.obtenerProyectos();
          });
        }
      }
    });
  }
}
