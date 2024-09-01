package com.tuempresa.gestionproyectos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.tuempresa.gestionproyectos.model.Empleado;
import com.tuempresa.gestionproyectos.service.EmpleadoService;

@Controller
public class EmpleadoGraphQLController {

    private final EmpleadoService empleadoService;

    @Autowired
    public EmpleadoGraphQLController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @QueryMapping(name = "listarEmpleados")
    public List<Empleado> empleados() {
        return empleadoService.getAllEmpleados();
    }

    @QueryMapping(name = "empleadoById")
    public Empleado empleadoById(@Argument Long id) {
        return empleadoService.getEmpleadoById(id);
    }

    @MutationMapping(name = "crearEmpleado")
    public Empleado createProyecto(@Argument Empleado empleado) {
        //System.out.println("Nombre recibido: " + empleado.getNombre());
        //System.out.println("Descripción recibida: " + empleado.getDescripcion());
        
        Empleado savedEmpleado = empleadoService.createEmpleado(empleado);
        System.out.println("Proyecto guardado: " + savedEmpleado);
        
        return savedEmpleado;
    }

    @MutationMapping(name = "updateEmpleado")
    public Empleado updateEmpleado(@Argument Long id, @Argument String nombre, @Argument String apellido, @Argument String email) {
        Empleado empleado = empleadoService.getEmpleadoById(id);
        empleado.setNombre(nombre);
        empleado.setApellido(apellido);
        empleado.setEmail(email);
        return empleadoService.updateEmpleado(id, empleado);
    }

    @MutationMapping(name = "deleteEmpleado")
    public void deleteEmpleado(@Argument Long id) {
        empleadoService.deleteEmpleado(id);
    }
}
