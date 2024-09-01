package com.tuempresa.gestionproyectos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.tuempresa.gestionproyectos.model.Proyecto;
import com.tuempresa.gestionproyectos.service.ProyectoService;

@Controller
public class ProyectoGraphQLController {

    private final ProyectoService proyectoService;

    @Autowired
    public ProyectoGraphQLController(ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    @QueryMapping(name = "listarProyectos")
    public List<Proyecto> listarProyectos() {
        return proyectoService.getAllProyectos();
    }

    @QueryMapping(name = "getProyectoById")
    public Proyecto getProyectoById(@Argument Long id) {
        return proyectoService.getProyectoById(id);
    }

    @MutationMapping(name = "crearProyecto")
    public Proyecto createProyecto(@Argument Proyecto proyecto) {
        System.out.println("Nombre recibido: " + proyecto.getNombre());
        System.out.println("Descripción recibida: " + proyecto.getDescripcion());
        
        Proyecto savedProyecto = proyectoService.createProyecto(proyecto);
        System.out.println("Proyecto guardado: " + savedProyecto);
        
        return savedProyecto;
    }
    
    

    @MutationMapping(name = "updateProyecto")
    public Proyecto updateProyecto(@Argument Long id, @Argument String nombre, @Argument String descripcion) {
        Proyecto proyecto = proyectoService.getProyectoById(id);
        proyecto.setNombre(nombre);
        proyecto.setDescripcion(descripcion);
        return proyectoService.updateProyecto(id, proyecto);
    }

    @MutationMapping(name = "deleteProyecto")
    public void deleteProyecto(@Argument Long id) {
        proyectoService.deleteProyecto(id);
    }
}