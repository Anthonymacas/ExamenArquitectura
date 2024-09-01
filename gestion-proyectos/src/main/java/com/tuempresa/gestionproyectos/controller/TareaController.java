package com.tuempresa.gestionproyectos.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuempresa.gestionproyectos.model.Proyecto;
import com.tuempresa.gestionproyectos.model.Tarea;
import com.tuempresa.gestionproyectos.service.ProyectoService;
import com.tuempresa.gestionproyectos.service.TareaService;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    private final TareaService tareaService;
    private final ProyectoService proyectoService;

    @Autowired
    public TareaController(TareaService tareaService, ProyectoService proyectoService) {
        this.tareaService = tareaService;
        this.proyectoService = proyectoService;
    }

    @GetMapping
    public List<Tarea> getAllTareas() {
        return tareaService.getAllTareas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarea> getTareaById(@PathVariable Long id) {
        Tarea tarea = tareaService.getTareaById(id);
        return ResponseEntity.ok(tarea);
    }

    @PostMapping
    public ResponseEntity<Tarea> createTarea(@RequestBody java.util.Map<String, Object> requestData) {
        String nombre = (String) requestData.get("nombre");
        String descripcion = (String) requestData.get("descripcion");
        Long proyectoId = ((Number) requestData.get("proyectoId")).longValue();
        List<Long> empleadoIds = ((List<?>) requestData.get("empleadoIds")).stream()
                .map(empId -> ((Number) empId).longValue())
                .collect(Collectors.toList());
    
        // Verificamos si el proyecto existe
        Proyecto proyecto = proyectoService.getProyectoById(proyectoId);
        if (proyecto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    
        Tarea tarea = new Tarea();
        tarea.setNombre(nombre);
        tarea.setDescripcion(descripcion);
        tarea.setProyecto(proyecto);
    
        // Llamamos al servicio para crear la tarea con los IDs de empleados
        Tarea nuevaTarea = tareaService.createTarea(tarea, proyectoId, empleadoIds);
        return new ResponseEntity<>(nuevaTarea, HttpStatus.CREATED);
    }
    
    

    @PutMapping("/{id}")
    public ResponseEntity<Tarea> updateTarea(@PathVariable Long id,
                                             @RequestBody java.util.Map<String, Object> requestData) {
        String nombre = (String) requestData.get("nombre");
        String descripcion = (String) requestData.get("descripcion");
        Long proyectoId = ((Number) requestData.get("proyectoId")).longValue();
        List<Long> empleadoIds = ((List<?>) requestData.get("empleadoIds")).stream()
                .map(empId -> ((Number) empId).longValue())
                .collect(Collectors.toList());
    
        Tarea tareaDetails = new Tarea();
        tareaDetails.setNombre(nombre);
        tareaDetails.setDescripcion(descripcion);
    
        Tarea updatedTarea = tareaService.updateTarea(id, tareaDetails, proyectoId, empleadoIds);
        return ResponseEntity.ok(updatedTarea);
    }
    
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTarea(@PathVariable Long id) {
        tareaService.deleteTarea(id);
        return ResponseEntity.noContent().build();
    }
}
