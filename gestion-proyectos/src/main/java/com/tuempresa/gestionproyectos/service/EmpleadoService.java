package com.tuempresa.gestionproyectos.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tuempresa.gestionproyectos.model.Empleado;
import com.tuempresa.gestionproyectos.repository.EmpleadoRepository;

@Service
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    @Transactional(readOnly = true)
    public List<Empleado> getAllEmpleados() {
        return empleadoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Empleado getEmpleadoById(Long id) {
        return empleadoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Empleado no encontrado"));
    }

    @Transactional
    public Empleado createEmpleado(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @Transactional
    public Empleado updateEmpleado(Long id, Empleado empleadoDetails) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Empleado no encontrado"));
        
        empleado.setNombre(empleadoDetails.getNombre());
        empleado.setApellido(empleadoDetails.getApellido());
        // Actualizar otras propiedades según sea necesario

        return empleadoRepository.save(empleado);
    }

    @Transactional
    public void deleteEmpleado(Long id) {
        empleadoRepository.deleteById(id);
    }
}
