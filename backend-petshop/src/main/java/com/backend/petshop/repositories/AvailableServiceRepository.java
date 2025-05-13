package com.backend.petshop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.petshop.entities.AvailableService;

@Repository
public interface AvailableServiceRepository extends JpaRepository<AvailableService, Long>{
}
