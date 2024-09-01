package com.tuempresa.gestionproyectos.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tuempresa.gestionproyectos.model.Proyecto;
import com.tuempresa.gestionproyectos.repository.ProyectoRepository;

@Service
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;

    public ProyectoService(ProyectoRepository proyectoRepository) {
        this.proyectoRepository = proyectoRepository;
    }

    @Transactional(readOnly = true)
    public List<Proyecto> getAllProyectos() {
        return proyectoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Proyecto getProyectoById(Long id) {
        return proyectoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
    }

    @Transactional
    public Proyecto createProyecto(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    @Transactional
    public Proyecto updateProyecto(Long id, Proyecto proyectoDetails) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proyecto no encontrado"));
        
        proyecto.setNombre(proyectoDetails.getNombre());
        proyecto.setDescripcion(proyectoDetails.getDescripcion());
        // Actualizar otras propiedades según sea necesario

        return proyectoRepository.save(proyecto);
    }

    @Transactional
    public void deleteProyecto(Long id) {
        proyectoRepository.deleteById(id);
    }
}
