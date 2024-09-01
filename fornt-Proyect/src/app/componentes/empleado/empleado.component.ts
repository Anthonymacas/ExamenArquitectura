import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { EditEmpleadoDialogComponent } from '../edit-empleado-dialog/edit-empleado-dialog.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
})
export class EmpleadoComponent implements OnInit {
  empleados: Empleado[] = [];
  nuevoEmpleado: Empleado = { id: 0, nombre: '', apellido: '', email: '' };

  constructor(
    private empleadosServicio: EmpleadoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado(): void {
    this.empleadosServicio.cargarEmpleado().subscribe((response: any) => {
      this.empleados = response.data.listarEmpleados;
    });
  }

  crearEmpleado(): void {
    this.empleadosServicio.crearEmpleado(this.nuevoEmpleado).subscribe(() => {
      this.cargarEmpleado();
      this.nuevoEmpleado = { id: 0, nombre: '', apellido: '', email: '' };
    });
  }

  borrarEmpleado(id: number): void {
    this.empleadosServicio.borrarEmpleado(id).subscribe(() => {
      this.cargarEmpleado();
    });
  }

  abrirDialogoEmpleado(empleado?: Empleado): void {
    const dialogRef = this.dialog.open(EditEmpleadoDialogComponent, {
      width: '250px',
      data: empleado
        ? empleado
        : { id: 0, nombre: '', apellido: '', email: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id === 0) {
          this.empleadosServicio.crearEmpleado(result).subscribe(() => {
            this.cargarEmpleado();
          });
        } else {
          this.empleadosServicio.actualizarEmpleado(result).subscribe(() => {
            this.cargarEmpleado();
          });
        }
      }
    });
  }
}
