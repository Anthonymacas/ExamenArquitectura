package com.tuempresa.gestionproyectos.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.tuempresa.gestionproyectos.model.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
}

