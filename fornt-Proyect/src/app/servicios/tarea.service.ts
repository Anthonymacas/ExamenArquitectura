import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from 'src/app/interfaces/tarea';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private apiUrl = 'http://localhost:8080/graphql';  // URL del backend GraphQL

  constructor(private http: HttpClient) {}

  // Función para obtener todas las tareas
  fetchTareas(): Observable<any> {
    const query = `
      query {
        listarTareas {
          id
          nombre
          descripcion
          proyecto {
            id
            nombre
          }
          empleados {
            id
            nombre
          }
        }
      }
    `;

    return this.http.post<any>(this.apiUrl, { query }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para crear una nueva tarea
  crearTarea(tarea: Tarea): Observable<Tarea> {
    const mutation = `
      mutation {
        crearTarea(tarea: {
          nombre: "${tarea.nombre}",
          descripcion: "${tarea.descripcion}",
          proyectoId: ${tarea.proyecto.id},
          empleadosIds: [${tarea.empleados.map(e => e.id).join(',')}]
        }) {
          id
          nombre
          descripcion
        }
      }
    `;

    return this.http.post<Tarea>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para actualizar una tarea
  actualizarTarea(tarea: Tarea): Observable<Tarea> {
    const mutation = `
      mutation {
        actualizarTarea(tarea: {
          id: ${tarea.id},
          nombre: "${tarea.nombre}",
          descripcion: "${tarea.descripcion}",
          proyectoId: ${tarea.proyecto.id},
          empleadosIds: [${tarea.empleados.map(e => e.id).join(',')}]
        }) {
          id
          nombre
          descripcion
        }
      }
    `;

    return this.http.post<Tarea>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para borrar una tarea
  borrarTarea(id: number): Observable<void> {
    const mutation = `
      mutation {
        borrarTarea(id: ${id})
      }
    `;

    return this.http.post<void>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
