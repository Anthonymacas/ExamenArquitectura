package com.tuempresa.gestionproyectos.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.tuempresa.gestionproyectos.model.Proyecto;

public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
}
