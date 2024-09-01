import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/graphql';  // URL del backend GraphQL

  constructor(private http: HttpClient) {}

  // Función para obtener todos los empleados
  cargarEmpleado(): Observable<any> {
    const query = `
      query {
        listarEmpleados {
          id
          nombre
          apellido
          email
        }
      }
    `;

    return this.http.post<any>(this.apiUrl, { query }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para crear un nuevo empleado
  crearEmpleado(empleado: Empleado): Observable<Empleado> {
    const mutation = `
      mutation {
        crearEmpleado(empleado: {
          nombre: "${empleado.nombre}",
          apellido: "${empleado.apellido}",
          email: "${empleado.email}"
        }) {
          id
          nombre
          apellido
          email
        }
      }
    `;

    return this.http.post<Empleado>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para actualizar un empleado
  actualizarEmpleado(empleado: Empleado): Observable<Empleado> {
    const mutation = `
      mutation {
        actualizarEmpleado(empleado: {
          id: ${empleado.id},
          nombre: "${empleado.nombre}",
          apellido: "${empleado.apellido}",
          email: "${empleado.email}"
        }) {
          id
          nombre
          apellido
          email
        }
      }
    `;

    return this.http.post<Empleado>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para borrar un empleado
  borrarEmpleado(id: number): Observable<void> {
    const mutation = `
      mutation {
        borrarEmpleado(id: ${id})
      }
    `;

    return this.http.post<void>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
