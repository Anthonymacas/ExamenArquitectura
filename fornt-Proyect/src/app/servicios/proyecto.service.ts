import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  private apiUrl = 'http://localhost:8080/graphql';  // URL del backend GraphQL

  constructor(private http: HttpClient) {}

  // Función para obtener todos los proyectos
  fetchProyectos(): Observable<any> {
    const query = `
      query {
        listarProyectos {
          id
          nombre
          descripcion
        }
      }
    `;

    return this.http.post<any>(this.apiUrl, { query }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para crear un nuevo proyecto
  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const mutation = `
      mutation {
        crearProyecto(proyecto: {
          nombre: "${proyecto.nombre}",
          descripcion: "${proyecto.descripcion}"
        }) {
          id
          nombre
          descripcion
        }
      }
    `;

    return this.http.post<Proyecto>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para actualizar un proyecto
  actualizarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const mutation = `
      mutation {
        actualizarProyecto(proyecto: {
          id: ${proyecto.id},
          nombre: "${proyecto.nombre}",
          descripcion: "${proyecto.descripcion}"
        }) {
          id
          nombre
          descripcion
        }
      }
    `;

    return this.http.post<Proyecto>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Función para borrar un proyecto
  borrarProyecto(id: number): Observable<void> {
    const mutation = `
      mutation {
        borrarProyecto(id: ${id})
      }
    `;

    return this.http.post<void>(this.apiUrl, { query: mutation }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
