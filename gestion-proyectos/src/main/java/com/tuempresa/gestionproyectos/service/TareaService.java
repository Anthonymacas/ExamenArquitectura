package com.tuempresa.gestionproyectos.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tuempresa.gestionproyectos.model.Empleado;
import com.tuempresa.gestionproyectos.model.Proyecto;
import com.tuempresa.gestionproyectos.model.Tarea;
import com.tuempresa.gestionproyectos.repository.EmpleadoRepository;
import com.tuempresa.gestionproyectos.repository.ProyectoRepository;
import com.tuempresa.gestionproyectos.repository.TareaRepository;

@Service
@Transactional
public class TareaService {

    private final TareaRepository tareaRepository;
    private final ProyectoRepository proyectoRepository;
    private final EmpleadoRepository empleadoRepository;

    @Autowired
    public TareaService(TareaRepository tareaRepository, ProyectoRepository proyectoRepository, EmpleadoRepository empleadoRepository) {
        this.tareaRepository = tareaRepository;
        this.proyectoRepository = proyectoRepository;
        this.empleadoRepository = empleadoRepository;
    }

    @Transactional
    public Tarea createTarea(Tarea tareaParam, Long proyectoId, List<Long> empleadoIds) {
        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
    
        List<Empleado> empleados = empleadoIds.stream()
            .map(id -> empleadoRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Empleado no encontrado: " + id)))
            .collect(Collectors.toList());
    
    
        Tarea tarea = new Tarea();
        tarea.setNombre(tareaParam.getNombre());
        tarea.setDescripcion(tareaParam.getDescripcion());
        tarea.setProyecto(proyecto);
        tarea.setEmpleados(empleados);
        return tareaRepository.save(tarea);
    }

    @Transactional
    public Tarea updateTarea(Long id, Tarea tareaDetails, Long proyectoId, List<Long> empleadoIds) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tarea no encontrada"));
    
        Proyecto proyecto = proyectoRepository.findById(proyectoId)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
    
        List<Empleado> empleados = empleadoIds.stream()
            .map(empId -> empleadoRepository.findById(empId)
                    .orElseThrow(() -> new IllegalArgumentException("Empleado no encontrado: " + empId)))
            .collect(Collectors.toList());
    
        tarea.setNombre(tareaDetails.getNombre());
        tarea.setDescripcion(tareaDetails.getDescripcion());
        tarea.setProyecto(proyecto);
        tarea.setEmpleados(empleados);
    
        return tareaRepository.save(tarea);
    }
    

    @Transactional(readOnly = true)
    public List<Tarea> getAllTareas() {
        return tareaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Tarea getTareaById(Long id) {
        return tareaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tarea no encontrada"));
    }

    @Transactional
    public void deleteTarea(Long id) {
        tareaRepository.deleteById(id);
    }
}
