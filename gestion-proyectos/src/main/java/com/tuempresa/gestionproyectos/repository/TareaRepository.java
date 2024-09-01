package com.tuempresa.gestionproyectos.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.tuempresa.gestionproyectos.model.Tarea;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
}

